/**
 * https://www.builder.io/blog/safe-data-fetching#optionally-making-our-wrapper-type-safe
 */

const isPlainObject = (value: unknown) => value?.constructor === Object;

class ResponseError extends Error {
	response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.response = response;
	}
}

/**
 * Wraps the fetch api.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch).
 */
export async function fetch(
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> {
	let initOptions = init;
	// If we specified a RequestInit for fetch
	if (initOptions?.body) {
		// If we have passed a body property and it is a plain object or array
		if (Array.isArray(initOptions.body) || isPlainObject(initOptions.body)) {
			// Create a new options object serializing the body and ensuring we
			// have a content-type header
			initOptions = {
				...initOptions,
				body: JSON.stringify(initOptions.body),
				headers: {
					'Content-Type': 'application/json',
					...initOptions.headers,
				},
			};
		}
	}

	const response = await window.fetch(input, initOptions);
	if (!response.ok) {
		throw new ResponseError('Bad response', response);
	}

	return response;
}

/**
 * Fetch, but only return `response.json()`.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch).
 */
export async function fetchJSON(input: RequestInfo | URL, init?: RequestInit) {
	const response = await fetch(input, init);
	return response.json();
}

/**
 * A reusable error handler for the fetch wrapper.
 *
 * [Blog post](https://www.builder.io/blog/safe-data-fetching#reusable-error-handling).
 */
export function handleFetchError(error: unknown) {
	if (error instanceof ResponseError) {
		switch (error.response.status) {
			default:
				// Show
				throw new Error('Unhandled fetch response', { cause: error });
		}
	}
	throw new Error('Unknown fetch error', { cause: error });
}
