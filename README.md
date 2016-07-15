[![build status](https://gitlab.com/arguweb/aod_demo/badges/master/build.svg)](https://gitlab.com/arguweb/aod_demo/commits/master)

# AOD Demo
Deze demo bevat een interface voor open data van de gemeenteraad.

### Usage

* Install nodemon, concurrently and rimraf globally `npm i -g nodemon concurrently rimraf`
* To start dev-server run `npm run start`
* To start api run `npm run api`
* To start dev-server and api alongside, run `npm run start-dev`


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

### Docker
- In a docker-enabled tab run `docker build .`
- Run `docker run [id]`
- Get docker machine ip by running `docker-machine ip default`

### Links
- Please use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react)
- Uses the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Uses [Redux Api Middleware](https://github.com/agraboso/redux-api-middleware)
