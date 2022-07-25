import fse from "fs-extra";
import { logger } from "./logger";
import { PathResolver } from "./path-resolve";
import { DependencyData } from "./resolve-dependency";

export function removeDependencyJson(path: string) {
  if (!fse.existsSync(path)) {
    logger.warn(`remove dependency json failed: ${path} not exists`);
    return;
  }
  fse.removeSync(path);
}

export function generateDependencyJson(
  data: DependencyData,
  pathResolver: PathResolver
) {
  const { file_dir, file_path, context } = pathResolver;

  /**
   * do not write to json if nothing parsed, cause webpack will emit blank stats
   * sometimes.
   */
  if (!Object.keys(data).length) {
    logger.info('data length 0', data)
    return;
  }

  fse.mkdirSync(file_dir, { recursive: true });

  fse.writeJsonSync(
    file_path,
    {
      context,
      dependencies: data
    },
    { spaces: 2 }
  );

  logger.debug(`generated: ${file_path}`);
}
