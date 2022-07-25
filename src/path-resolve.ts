import { Compiler } from "webpack";
import { Options } from "./options";
import path from "path";

export type PathResolver = ReturnType<typeof resolvePath>;

export function resolvePath(options: Options, compiler: Compiler) {
  const {
    baseDir,
    output_dir,
    output_filename,
    include,
    exclude,
    exclude_node_modules,
  } = options;
  const { context, outputPath } = compiler;

  const file_dir = output_dir || outputPath;
  const file_path = path.resolve(file_dir, output_filename);
  const base_dir = baseDir || context;

  const shouldPathResolved = (filePath: string) => {
    if (!filePath) return false;

    // get absolute path
    filePath = path.resolve(context, filePath);

    if (!include.test(filePath)) {
      return false;
    }
    if (exclude.test(filePath)) {
      return false;
    }
    if (exclude_node_modules && filePath.includes("/node_modules/")) {
      return false;
    }

    if (!filePath.startsWith(base_dir)) {
      return false;
    }

    return true;
  };

  return {
    file_dir,
    file_path,
    base_dir,
    context,
    shouldPathResolved,
  };
}
