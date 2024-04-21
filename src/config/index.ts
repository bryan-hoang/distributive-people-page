import { parse, string } from "valibot";

import { debugLog } from "@/lib/debug";

debugLog(`BASE_PATH: ${process.env.NEXT_PUBLIC_BASE_PATH}`);

/**
 * The pathname the website is deployed under.
 */
export const BASE_PATH = parse(string(), process.env.NEXT_PUBLIC_BASE_PATH);
