import type { Compiler, Stats } from "webpack";
import { generateDependencyJson, removeDependencyJson } from "./file-handle";
import { logger } from "./logger";
import { BaseOptions, Options } from "./options";
import { resolvePath } from "./path-resolve";
import { resolveDependencyData } from "./resolve-dependency";

export class WebpackDependencyListPlugin {
  private opts: Options;
  private compiler!: Compiler;

  private get pathResolver() {
    return resolvePath(this.opts, this.compiler);
  }

  constructor(opts: Partial<Options> = {}) {
    this.opts = { ...BaseOptions, ...opts };
    logger.info("options: ", this.opts);
  }

  public apply(compiler: Compiler) {
    logger.info("plugin apply");

    this.compiler = compiler;

    removeDependencyJson(this.pathResolver.file_path);

    const done = (stats: Stats, callback?: () => void) => {
      logger.info("hooks done emitted");

      // callback is not always a function
      callback = callback || (() => void 0);

      const dependencyData = resolveDependencyData(stats, this.pathResolver);

      generateDependencyJson(dependencyData, this.pathResolver);
      callback?.();
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap(WebpackDependencyListPlugin.name, done);
    } else {
      // low version webpack api
      (compiler as any).plugin("done", done);
    }
  }
}
