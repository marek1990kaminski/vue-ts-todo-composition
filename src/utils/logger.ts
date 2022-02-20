export enum Mode {
  EXCLUDING, INCLUDING
}

export enum Level {
  DEBUG, WARN, ERROR
}

const noop = () => {

};

export interface ILoggerOptions {
  writer: any | Console;
  mode: Mode;
  level: Level;
  excludes: Array<string>;
  includes: Array<string>;
}

export class LoggerFactory {
  public options: ILoggerOptions;

  public constructor (options: ILoggerOptions) {
    this.options = options;
  }

  public create (name: string, options?: ILoggerOptions) {
    return new Logger(name, {...this.options, ...(options || {})});
  }
}

export class Logger implements ILoggerOptions {
  public writer: ILoggerOptions['writer'];
  public mode: Mode;
  public excludes: Array<string>;
  public includes: Array<string>;
  public name: string;
  public level: Level;

  private formatter: Intl.DateTimeFormat;

  constructor (name: string, options: ILoggerOptions) {
    this.writer = options.writer;
    this.mode = options.mode;
    this.excludes = options.excludes;
    this.includes = options.includes;
    this.level = options.level;
    this.name = name;
    this.blankIfExcluded();
    this.formatter = new Intl.DateTimeFormat(navigator.languages[0], {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public blankIfExcluded(): void {
    if (this.mode === Mode.EXCLUDING) {
      if (this.excludes.indexOf(this.name) !== -1) {
        this.log = noop;
      }
    } else if (this.includes.indexOf(this.name) === -1) {
      this.log = noop;
    }

    switch (this.level) {
      case Level.ERROR:
        this.warn = noop; // falls through, thats on purpose
      case Level.WARN:
        this.debug = noop;
    }
  }

  public debug = (...args: [string, ...Array<any>]): void => {
    args.unshift('debug');
    this.log(...args);
  };

  public warn = (...args: [string, ...Array<any>]): void => {
    args.unshift('warn');
    this.log(...args);
  };

  public error = (...args: [string, ...Array<any>]): void => {
    args.unshift('error');
    this.log(...args);
  };

  private log = (level: string, ...args: Array<any>): void => {
    const date = new Date();
    const time = this.formatter.format(date);
    const prefix = `%c ${time}.${date.getMilliseconds()} ${this.name}:`;
    const style = 'color: green;';

    args.unshift(prefix, style);

    this.writer[level](...args);
  };
}

const loggerFactory = new LoggerFactory({
  // excludes: ['SavingsChartFiltersComponent'],
  excludes: [],
  includes: [],
  level: Level.DEBUG, // Level.DEBUG,
  mode: Mode.EXCLUDING,
  writer: console
});

export default loggerFactory;
