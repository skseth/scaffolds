# Packages

react, react-dom

dev-only :
typescript, @types/react, @types/react-dom
@babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript

webpack webpack-cli webpack-dev-server html-webpack-plugin

babel-loader

css-loader style-loader (for styles)

png / svg and other images - add to declarations.d.ts, use asset loader of webpack

webpack-merge to merge webpack configs

npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh // for react refresh, a better HMR

npm i -D eslint eslint-plugin-react esli
nt-plugin-react-hooks
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

npm i -D prettier eslint-config-prettier eslint-plugin-prettier

Add husky / lint-staged - for ensuring linting / formatting before commit

Add @babel/runtime, @babel/plugin-transforms-runtime. See https://babeljs.io/docs/en/babel-plugin-transform-runtime#technical-details

copy-webpack-plugin

webpack-bundle-analyzer



# config files

tsconfig.json
.babelrc
webpack configs
