import { renderSSR } from './ssrHelper';

export function handleRequest(req: any, res: any) {
  res.end(renderSSR('<h1>SSR Example</h1>'));
}
