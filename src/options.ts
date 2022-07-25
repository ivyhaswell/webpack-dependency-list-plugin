export type Options = {
  /**
   * base directory, the search scope, only search modules in this directory or
   * its subdirectories, should be absolute path.
   *
   * @default compiler.context
   */
  baseDir: string;
  /**
   * the module should be include
   * @example /\.(js|ts|jsx|tsx)$/
   * @default /\.tsx?$/
   */
  include: RegExp;
  /**
   * the module should be exclude
   * @example /\.d\.ts$/
   * @default /(\.d\.ts|\.test\.ts|\.spec\.ts|\.e2e\.ts|\.mock\.ts|\.stories\.ts)x?$/,
   */
  exclude: RegExp;
  /**
   * exclude node_modules or not
   * @default true
   */
  exclude_node_modules: boolean;
  /**
   * output directory, should be absolute path.
   * @default compiler.outputPath
   */
  output_dir: string;
  /**
   * output file name
   * @default "dependency-tree.json"
   */
  output_filename: string;
};

export const BaseOptions: Options = {
  baseDir: '',
  include: /\.tsx?$/,
  exclude: /(\.d\.ts|\.test\.ts|\.spec\.ts|\.e2e\.ts|\.mock\.ts|\.stories\.ts)x?$/,
  exclude_node_modules: true,
  output_dir: '',
  output_filename: 'dependency-tree.json'
}
