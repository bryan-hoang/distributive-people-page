import { createZodFetcher } from 'zod-fetch';
import { z } from 'zod';

import { fetch, fetchJSON, handleFetchError } from '@/lib/fetch';
import config from '@/config/config.json';

const fetchWithZod = createZodFetcher(fetchJSON);

export const getProjects = async () => {
	const response = await fetchWithZod(
		z.array(
			z.object({
				name: z.string(),
				html_url: z.string(),
			}),
		),
		`https://api.github.com/users/${config.social.github}/repos`,
	);

	return response;
};

export const getReadme = async () => {
	const response = await fetch(config.readmeUrl);
	const data = await response.text();
	return data;
};

export const getWeather = async (city: string) => {
	try {
		const response = await fetch(`https://wttr.in/${city}?ATm`);
		const data = await response.text();
		return data;
	} catch (error) {
		handleFetchError(error);

		return `Error fetching weather: ${
			error instanceof Error ? error.message : error
		}`;
	}
};

export const getQuote = async () => {
	const data = await fetchWithZod(
		z.object({ author: z.string(), content: z.string() }),
		'https://api.quotable.io/random',
	);
	return {
		quote: `"${data.content}" _ ${data.author}`,
	};
};
