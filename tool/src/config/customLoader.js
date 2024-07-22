import { extname } from 'path';

export async function loadConfig(path) {
  const ext = extname(path);

  if (ext === '.js' || ext === '.mjs') {
    const module = await import(path);
    return module.default || module;
  }

  throw new Error('Unsupported file extension');
}

