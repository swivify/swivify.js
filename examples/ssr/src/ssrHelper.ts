export function renderSSR(html: string) {
  return `<!DOCTYPE html>\n<html><body>${html}</body></html>`;
}
