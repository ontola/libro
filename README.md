[![build status](https://gitlab.com/argu/aod_demo/badges/master/build.svg)](https://gitlab.com/arguweb/aod_demo/commits/master)

# AOD Demo
Deze demo bevat een interface voor open data van de gemeenteraad.

### Usage

* `npm i` to install dependencies
* `npm dev` to start the dev-server with corsproxy for the API and react-styleguidist for component reference.
* Visit http://localhost:3001/

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
If you're using Atom, please install [this plugin](https://atom.io/packages/linter-sass-lint).
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

### Recommended Atom packages
- [Linter](https://atom.io/packages/linter) for a realtime linting experience.
- [language-babel](https://atom.io/packages/language-babel) for auto-indenting, syntax highlighting.

### Links
- Please use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react)
- Uses the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
