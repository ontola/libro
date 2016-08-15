[![build status](https://gitlab.com/arguweb/aod_demo/badges/master/build.svg)](https://gitlab.com/arguweb/aod_demo/commits/master)

# AOD Demo
Deze demo bevat een interface voor open data van de gemeenteraad.

### Usage

* Install rimraf globally `npm i -g rimraf`
* To start dev-server run `npm start`
* To start api, go to the [repo](https://bitbucket.org/arguweb/od_api_generator/)
* To use search, run `npm run corsproxy`

### Build

Generate all the build files under /dist

```
npm run build
```

### Linting
Install this base linter for atom [plugin](https://atom.io/packages/linter) for a realtime linting experience. 

#### JS(X)
```
npm run lint
```

#### SASS
If you using Atom, please install [this plugin](https://atom.io/packages/linter-sass-lint).
```
npm run lint:style
```

### Testing

Tests are made using mocha, chai assert and enzyme ([docs](http://airbnb.io/enzyme/docs/api/index.html))

```
npm run test
```

### Styleguide
The styleguide can be used as a reference, and also to develop individual components.

```
npm run styleguide-server
```

### Docker (does not really work yet)
- In a docker-enabled tab run `docker build .`
- Run `docker run [id]`
- Get docker machine ip by running `docker-machine ip default`

### Links
- Please use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react)
- Uses the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Uses [Redux Api Middleware](https://github.com/agraboso/redux-api-middleware)
