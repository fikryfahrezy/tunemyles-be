import pino, { LogFn } from "pino";

type LogLevel =
  | "fatal"
  | "error"
  | "warn"
  | "info"
  | "debug"
  | "trace"
  | "silent";

function destination(level: LogLevel, ...params: unknown[]) {
  //   const dest = pino.destination({ dest: `./logs/${level}.log`, sync: false });
  //   const logger = pino({ prettyPrint: { colorize: true } }, dest);
  const logger = pino({ prettyPrint: { colorize: true } });

  const firstParam = params[0];
  const secondParam = params[1];
  if (typeof firstParam === "string" && typeof secondParam === "undefined") {
    const rest = params.slice(1);
    logger[level](firstParam, rest);
  } else {
    const obj = firstParam as { [k: string]: unknown };
    const msg = params[1] as string;
    const rest = params.slice(2);
    logger[level](obj, msg, ...rest);
  }
}

export const trace: LogFn = function (...params: unknown[]) {
  destination("trace", ...params);
};
export const debug: LogFn = function (...params: unknown[]) {
  destination("debug", ...params);
};
export const info: LogFn = function (...params: unknown[]) {
  destination("info", ...params);
};
export const warn: LogFn = function (...params: unknown[]) {
  destination("warn", ...params);
};
export const error: LogFn = function (...params: unknown[]) {
  destination("error", ...params);
};
export const fatal: LogFn = function (...params: unknown[]) {
  destination("fatal", ...params);
};

const logger = {
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
};

export default logger;
