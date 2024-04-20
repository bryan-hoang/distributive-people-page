import { parse, string } from "valibot";

/**
 * The pathname the website is deployed under.
 */
export const BASE_PATH = parse(string(), process.env.NEXT_PUBLIC_BASE_PATH);
