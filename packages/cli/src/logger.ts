import * as colorette from 'colorette';

export const log = {
  info: (msg: string) => console.log(colorette.cyan(`[info] ${msg}`)),
  success: (msg: string) => console.log(colorette.green(`[success] ${msg}`)),
  warn: (msg: string) => console.log(colorette.yellow(`[warn] ${msg}`)),
  error: (msg: string) => console.error(colorette.red(`[error] ${msg}`)),
};
