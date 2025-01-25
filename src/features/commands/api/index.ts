import { ofetch } from "ofetch";

import config from "@/config/config.json";
import { handleFetchError } from "@/lib/fetch";
import * as v from "valibot";

export const getProjects = async () => {
	const response = await ofetch(
		`https://api.github.com/users/${config.social.github}/repos`,
	);

	const ProjectSchema = v.array(
		v.object({
			name: v.string(),
			html_url: v.pipe(v.string(), v.url()),
		}),
	);

	const projects = v.parse(ProjectSchema, response);

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
	const QuoteSchema = v.object({
		author: v.string(),
		content: v.string(),
	});
	const data = v.parse(QuoteSchema, response);
	return {
		quote: `"${data.content}" _ ${data.author}`,
	};
};
