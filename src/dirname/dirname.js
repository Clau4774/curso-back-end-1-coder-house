import {dirname, join} from 'node:path';
import { fileURLToPath } from 'node:url';

export const __dirname = join(dirname(fileURLToPath(import.meta.url)), '..');