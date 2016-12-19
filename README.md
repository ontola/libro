[![build status](https://gitlab.com/argu/aod_demo/badges/master/build.svg)](https://gitlab.com/arguweb/aod_demo/commits/master)

# AOD Demo
Deze demo bevat een interface voor open data van de gemeenteraad.

### Usage
* `npm install` or `yarn` to install dependencies. [Yarn](https://yarnpkg.com) is similar to NPM, but better. It's faster, since it caches every package, and it's more deterministic, making it less prone to bugs. Follow the [Yarn installation instructions](https://yarnpkg.com/en/docs/install) for your OS.
* `npm run dev` to start the dev-server with corsproxy for the API and react-styleguidist for component reference.
* Visit [http://localhost:3001/](http://localhost:3001/)

### Build

Generate all the build files under `/dist`

```
npm run build
```

#### JS(X)
```
npm run lint
```

#### SASS
```
npm run lint:style
```

Uses [Harry Roberts'](https://en.bem.info/methodology/naming-convention/#alternative-naming-schemes) style naming with Component names as block name. For example `.Block__element--modifier` or `.ProfileCard__stat-value--light`

### Testing
Tests are made using mocha, chai assert and enzyme ([docs](http://airbnb.io/enzyme/docs/api/index.html))

```
npm run test
```

### Styleguide
[React-styleguidist styleguide](https://github.com/sapegin/react-styleguidist) can be used as a reference, and also to develop individual components.

View the styleguide by visiting http://localhost:5000/

### Security
Uses [NSP](https://github.com/nodesecurity/nsp) and [Retire.js](https://github.com/RetireJS/retire.js)
```
npm run secure
```

### Adding a new model
Since this project uses Redux, displaying data is not that always that trivial. Say there's a new model (e.g. meetings, documents) accessible in the API. You want to use that data in this app. Here's how you do that:

- Create a model with the name of the content type. Model (file)names are capitalized. It's easy to copy another model to bootstrap your new one.
- Use camelCased attributes - even if the API passes you under_scored ones. This is because the DataStore normalizes all incoming data.
- Write the relevant GET_MODEL actions and put them in the `state/action-types.js` file.
- Write your reducer(s) in `state/model/reducer.js`.
- Write your selectors in `state/model/selectors.js`. Use the [reselect library](https://github.com/reactjs/reselect) and immutable.js functions.
- Create a container component that binds the store data to props and pass that to a UI component.

### Running the API locally
If you don't want to use the default AOD api, but run your own instance, you have to use a proxy. We've preconfigured an NGINX docker file to provide a proxy.

- Paste your current local IP address in the `dev/nginx.conf`
- Run `docker build .` in /dev
- Copy the container id (e.g. 775a00c00bed)
- Run `docker run -p 3331:3031 -it {container_id}`

### Dev rules
- Please use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react)
- Document your components internally by adding comments to propTypes. Write them \/\*\* Like this \*\/ to make sure they are parsed by react-styleguidist.
- Document your components by adding a `readme.md` that includes a usage example that works with react-styleguidist.
- This repo binds the linters and mocha tests to the git precommit hook. Now you cannot commit code that contains errors. Therefore committing may take a little longer, however this results in less errors.
- Document functions using jsdoc.

### Recommended Atom packages
- [Linter](https://atom.io/packages/linter) for a realtime linting experience.
- [linter-eslint](https://atom.io/packages/linter-eslint)
- [linter-sass-lint](https://atom.io/packages/linter-sass-lint)
- [language-babel](https://atom.io/packages/language-babel) for syntax highlighting and auto-indenting.
- [ternjs](https://atom.io/packages/atom-ternjs) for autocompletion.
- [jsdoc](https://atom.io/packages/jsdoc) for quick jsdoc comment generation.
- [nuclide](https://atom.io/packages/nuclide) for go-to-definition click, built-in debugging and Flow support.
- [nice index](https://atom.io/packages/nice-index) for displaying the component name instead of 'index.jsx' in the tabs.
- [project-manager](https://atom.io/packages/project-manager) for quickly swithing between projects
- [sort-lines](https://atom.io/packages/sort-lines) for sorting lines. Very useful, since both out sass and js linters require alphabetical sorting.
- [toggle-quotes](https://atom.io/packages/toggle-quotes) for switching between double and single quotes.

### Recommended Dev tools
- Chrome plugins: [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [Immutable formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog/related)
