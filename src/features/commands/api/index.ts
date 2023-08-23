import axios from 'axios';
import { createZodFetcher } from 'zod-fetch';
import { z } from 'zod';

import config from '@/config/config.json';
import { fetchJSON } from '@/lib/fetch';

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
	const { data } = await axios.get(config.readmeUrl);
	return data;
};

export const getWeather = async (city: string) => {
	try {
		const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
		return data;
	} catch (error) {
		return error;
	}
};

export const getQuote = async () => {
	const { data } = await axios.get('https://api.quotable.io/random');
	return {
		quote: `“${data.content}” — ${data.author}`,
	};
};
