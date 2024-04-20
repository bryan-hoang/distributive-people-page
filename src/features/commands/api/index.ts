import { ofetch } from "ofetch";

import config from "@/config/config.json";
import { handleFetchError } from "@/lib/fetch";
import { url, array, object, parse, string } from "valibot";

export const getProjects = async () => {
	const response = await ofetch(
		`https://api.github.com/users/${config.social.github}/repos`,
	);

	const projects = parse(
		array(
			object({
				name: string(),
				html_url: string([url()]),
			}),
		),
		response,
	);

	return projects;
};

export const getReadme = async () => {
	const response = await ofetch(config.readmeUrl);
	return response;
};

export const getWeather = async (city: string) => {
	try {
		const response = await ofetch(`https://wttr.in/${city}?ATm`);
		return response;
	} catch (error) {
		handleFetchError(error);

		return `Error fetching weather: ${
			error instanceof Error ? error.message : error
		}`;
	}
};

export const getQuote = async () => {
	const response = await ofetch("https://api.quotable.io/random");
	const data = parse(
		object({
			author: string(),
			content: string(),
		}),
		response,
	);
	return {
		quote: `"${data.content}" _ ${data.author}`,
	};
};
