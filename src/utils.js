/**
 * File to get actual folder route.
 * Util to config views, and static file while usiong Multer
 * */
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
