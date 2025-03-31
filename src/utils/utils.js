/**
 * File to get actual folder route.
 * Es útil para configurar las vistas, los archivos estáticos y cuando usamos Multer
 */
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
