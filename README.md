## Available Scripts

In the project directory, you can run:

Note: You may use npm instead of yarn for these commands.

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.

- `yarn build` - builds the app for production to the `build` folder.

- `yarn eject` - exposes content of `react-script` package

- `yarn lint` - lints project files according to eslint rules, see below. Typical use case: continuous integration environments, Travis, CircleCI, etc.

- `yarn fix` - same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

## Redux configuration

Using basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Note technology agnostic `features` folder name. Based on Redux maintainers recommendation.

## Testing

Testing is done with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Uses [Prettier](https://prettier.io/)

## Styles/CSS/Styling

Using Material UI



Utilized CRA Template to get scaffolding for Redux, Typescript, React-Router: https://github.com/alexandr-g/cra-template-typescript-redux/tree/master
