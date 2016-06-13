# AOD Demo
Deze demo bevat een interface voor open data van de gemeenteraad.

### Usage

* Install [Foreman](https://github.com/ddollar/foreman)
* `$ foreman start`
* Open http://localhost:3000

See ./Procfile for the underlying commands

### Build

Generate all the build files under /dist

```
npm run build
```

### Linting

ESLint with React linting options have been enabled.

```
npm run lint
```

### Testing

Tests are made using mocha, chai assert and enzyme ([docs](http://airbnb.io/enzyme/docs/api/index.html))

```
npm run test
```
### Links
- Please use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless)
- Uses the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Uses [Redux Api Middleware](https://github.com/agraboso/redux-api-middleware)
