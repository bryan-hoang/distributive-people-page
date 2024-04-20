class ResponseError extends Error {
	response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.response = response;
	}
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
				throw new Error("Unhandled fetch response", { cause: error });
		}
	}
	throw new Error("Unknown fetch error", { cause: error });
}
