import chalk from "chalk";

const enum LogLevel {
  Info = 1,
  Debug = 1 << 1,
  Warn = 1 << 2,
  Error = 1 << 3,
}

const LevelColorMap = new Map([
  [LogLevel.Info, chalk.blue],
  [LogLevel.Debug, chalk.green],
  [LogLevel.Warn, chalk.yellow],
  [LogLevel.Error, chalk.red],
]);

const LevelConsoleMap = new Map([
  [LogLevel.Info, console.log],
  [LogLevel.Debug, console.log],
  [LogLevel.Warn, console.log],
  [LogLevel.Error, console.error],
]);

type LogMethodType = (...args: unknown[]) => void;

export class Logger {
  public info: LogMethodType;
  public debug: LogMethodType;
  public warn: LogMethodType;
  public error: LogMethodType;

  constructor(private prefix: string) {
    this.info = Logger.generateLogMethod(LogLevel.Info, this.prefix);
    this.debug = Logger.generateLogMethod(LogLevel.Debug, this.prefix);
    this.warn = Logger.generateLogMethod(LogLevel.Warn, this.prefix);
    this.error = Logger.generateLogMethod(LogLevel.Error, this.prefix);
  }

  static generateLogMethod(level: LogLevel, prefix: string) {
    const method = LevelConsoleMap.get(level)!;
    const color = LevelColorMap.get(level)!;

    return (...args: any[]) => {
      method(color(prefix), ...args);
    };
  }
}

export const logger = new Logger("[dependency list plugin]")

