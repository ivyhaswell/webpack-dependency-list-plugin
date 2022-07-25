<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Webpack Dependency List Plugin</h1>
  <p>Generate dependency list by webpack stats.</p>
</div>

<h2 align="center">Install</h2>

```bash
# NPM
npm install --save-dev webpack-dependency-list-plugin
# Yarn
yarn add -D webpack-dependency-list-plugin
```

<h2 align="center">Usage (as a plugin)</h2>

```js
const WebpackDependencyListPlugin = require('webpack-dependency-list-plugin').default;

module.exports = {
  plugins: [
    new WebpackDependencyListPlugin()
  ]
}
```

It will generate a json with the dependency module list of your bundles.

**JSON example**:
```json
{
  "dependencies": {
    "./pages/_app.tsx": [
      "./utils/polyfill.ts",
      "./components/index.tsx",
      "./utils/media.ts",
      "./hooks/useTransparentHeader.ts",
      "./hooks/index.ts",
      "./hooks/useInviteCode.ts",
      "./hooks/DoubleCardInfo.ts"
    ],
    "./components/CommonButton/InviteButton.tsx": [
      "./components/index.tsx",
      "./containers/home/DoubleCard/InviteFriendsModal/index.tsx"
    ]
  }
}
```

Your could use this module to:
1. Find the modules no longer used in project and optimize it.
2. Get all the dependencies of a entry module, for example, find all dependencies of a nextjs page entry, then you can do some optimization such as tms key resolve.
3. Find out resource files used in project and then do some optimization or arrangement. 

<h2 align="center">Options (for plugin)</h2>

```js
new WebpackDependencyListPlugin(options?: object)
```

|Name|Type|Default|Description|
|:--:|:--:|:--:|:----------|
|**`baseDir`**|`string`|`compiler.context`|base directory, the search scope, only search modules in this directory or its subdirectories, should be absolute path.|
|**`include`**|`RegExp`|`/\.tsx?$/`|the module should be include|
|**`exclude`**|`RegExp`|`.d.ts` `.test.ts` `.spec.ts` `.e2e.ts` `.mock.ts` `.stories.ts`|the module should be exclude|
|**`exclude_node_modules`**|`boolean`|`true`|exclude `node_modules` or not|
|**`output_dir`**|`string`|`compiler.outputPath`|output directory, should be absolute path.|
|**`output_filename`**|`string`|`"dependency-tree.json"`|output file name|

