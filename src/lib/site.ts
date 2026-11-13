export function withBasePath(path: string, base: string): string {
  const normalizedBase = base === '/'
    ? ''
    : `/${base.replace(/^\/+|\/+$/g, '')}`;
  const normalizedPath = path === '/'
    ? '/'
    : `/${path.replace(/^\/+/, '')}`;

  if (!normalizedBase) return normalizedPath;
  return normalizedPath === '/' ? `${normalizedBase}/` : `${normalizedBase}${normalizedPath}`;
}

export function absoluteSiteUrl(site: URL, path: string, base: string): string {
  return new URL(withBasePath(path, base), site).toString();
}

export function stripBasePath(path: string, base: string): string {
  const baseRoot = withBasePath('/', base).replace(/\/$/, '');
  if (!baseRoot || !path.startsWith(`${baseRoot}/`)) return path;
  return path.slice(baseRoot.length) || '/';
}
