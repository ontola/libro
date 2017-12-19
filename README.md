[![build status](https://gitlab.com/argu/aod_demo/badges/master/build.svg)](https://gitlab.com/arguweb/aod_demo/commits/master)

# AOD Demo
Front-end application for [Argu](https://argu.co).

## Usage
- `npm install` or `yarn` to install dependencies. [Yarn](https://yarnpkg.com) is similar to NPM, but better. Follow the [Yarn installation instructions](https://yarnpkg.com/en/docs/install) for your OS.
- Create a [.env file](https://www.npmjs.com/package/dotenv) by copying `.env.template`.
- `npm run dev` to start the dev-server with corsproxy for the API and react-styleguidist for component reference.
- Visit [http://localhost:3001/](http://localhost:3001/)

## Contributing
All tests and linters will be run automatically as a pre-commit hook.
- `npm run build` to generate all the build files under `/dist`
- `npm run lint` to run the ES linter. We use the [Airbnb React Styleguide](https://github.com/airbnb/javascript/tree/master/react) (read it!) and [jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) as linters.
- `npm run lint:style` to run the SASS linter.
- `npm run test` to run all tests.
- `npm run secure` to run security test.

### Running the API locally
If you don't want to use the default AOD api, but run your own instance, you have to use a proxy. We've preconfigured an NGINX docker file to provide a proxy.

- Paste your current local IP address in the `dev/nginx.conf`
- Run `docker build .` in /dev
- Copy the container id (e.g. 775a00c00bed)
- Run `docker run -p 3331:3031 -it {container_id}`

### Styling
Styling is done using SASS and React inline styles. Use [Harry Roberts'](https://en.bem.info/methodology/naming-convention/#alternative-naming-schemes) style naming with Component names as block name. For example `.Block__element--modifier` or `.ProfileCard__stat-value--light`.
All styling must be done in its respective component. Don't use ClassNames from other components.

[React-styleguidist styleguide](https://github.com/sapegin/react-styleguidist) can be used as a reference, and also to develop individual components. RUn `npm run dev` or `npm run styleguide-server` and visit http://localhost:5000/ to show the styleguide.

### Testing
Tests are written using jest+enzyme with additional expect matcher packages and some of our own
helper methods.

Some literature:
* [Jest introduction chapters](https://facebook.github.io/jest/docs/en/getting-started.html)
* [Testing introduction](https://blog.progressly.com/what-makes-a-good-test-dff3df6058a2)

Matcher documentations:
* [Jest expect matchers](https://github.com/blainekasten/enzyme-matchers#assertions)
* [Enzyme matchers](https://github.com/blainekasten/enzyme-matchers#assertions)
* [Jest-rspec](https://github.com/negativetwelve/jest-plugins/tree/master/packages/jest-plugin-set)
* [Enzyme shallow](http://airbnb.io/enzyme/docs/api/shallow.html)
* and our custom helper in `test/specHelper.js`

In general, only enzyme shallow should be used, since it's a lot faster and the additional
capabilities of `mount` are not needed in our unit tests.

### Markers
We use test markers to determine whether features were rendered. Decoupling these features allow us
to separate proof from implementation, which in turn makes implementation refactoring easier.

The markers have the following structure (in [RFC5234 ABNF](https://tools.ietf.org/html/rfc5234)):

```ABNF
marker = component-name "-" feature-name *( "-" feature-name ) ; upcase component name with appended (nested) feature names
feature-name   = 1*varchar                ; The name of a specific feature, often named semantically or based on an argument.
component-name = 1*pascalcase             ; The name of the class, module, or component.
varchar        =  ALPHA / DIGIT / "_"     ; We allow alphanum and underscores
pascalcase     =  uppercase 1*( lowercase / digit / uppercase )
lowercase      =  %x61-%x7A               ; a-z
uppercase      =  %x41-%x5A               ; A-Z
```

The feature name casing generally is dependent on the origin of the word; eg: `Notification-Unread` or `Attachment-preview`

#### Test structure
Tests are written on three levels;
1. Feature tests - These should cover the integration of multiple coupled views, e.g. entire features such as rendering the navbar or a motion page.
2. View tests - These should cover the integration between data and (multiple tightly coupled) views, e.g. submenu rendering.
3. Unit tests - These cover all the permutations of the base components, e.g. all the props and their output.

The unit (components) tests generally consist of two components:
- A general snapshot test to ensure all components are in order and the correct classes have been set
- Many marker-based tests to ensure all functionality is present and switched according to the requirements (arguments/data).

#### Golden tests
Since the underlying architecture/structure is still in early development, the exact requirements of
tests are still ill-defined, so the following files can be used for reference for the creation of
additional specs;
- Feature tests: `app/features/Navbar/*.spec.jsx`
- View tests: `app/views/MenuItem/MenuItem.spec.js`
- Unit tests: `app/components/Button/Button.spec.js`

#### Harvesting data
The feature and view tests require data to be feeded into the system, but since we don't have a
factory system yet, the data needs to be harvested manually for the time being. Luckily,
snapshot-testing compatible JS data can be obtained by running `dev.snapshot()` on the desired LOC
in the browser console.

### Security
Uses [NSP](https://github.com/nodesecurity/nsp) and [Retire.js](https://github.com/RetireJS/retire.js). Run tests using `npm run secure`.

### Components
- In this project, `components` are merely [presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) / display / UI components that should not represent any specific kind of concept. You can compare them to bootstrap components. Components should not fetch any data and should not be connected to redux. They also should not contain any components that fetch data. That's what Containers and Resources are responsible for.
- Name them as abstract as possible. That makes the component more re-usable.
- Use stateless functional components whenever possible to enhance performance.
- Use PropTypes and add a comment above non-obvious props `/** like this */` to provide a description that can be parsed by Styleguidist.
- Add a Readme.md file to provide example usage that automatically appears in Styleguidist.
- Document components like all other functions with JSdoc. Descriptions automatically appear in Styleguidist.

### Resources (using Link)
- Resources represent real world concepts, such as a person, a document, an event or an organization.
- They are rendered using Link-lib, which deals with fetching the data and making it accessible to use in React.
- Resources should not contain any styling of themselves. They are composed of Components.
- Resources can be rendered in various context (i.e. in its own page, as a small list item or as a card in some list). We call such a context a **topology**. We have predefined a couple of topologies:
  - **(default)** - The view that is used on the route, although some of the logic still resides in the route page.
  - **Collection** - Shown as a card with details and its most relevant properties.
  - **Row** - Shown as a single row inside a card with the most important details.
  - **Section** - Shown inside a card, but not as its own row.
  - **Detail** - Shown as a small piece of metadata inside some other resource.
  - **Parent** - Shown as its own card, mostly on top of a page.
  - **Inline** - A text to appear in some other text. Can be a link.
  - **Sidebar** - An item in the side menu.
- When naming your component, name them as `propertyTopology` and `TypeTopology`. For example: `nameCollection` or `MotionRow`.

### Creating a new interactive model
*Warning: only use this for models that the user can modify or create. Use Link-lib for view-only models.*
Say there's a new model (e.g. meetings, documents) accessible in the API that the user should interact with.

- Create a model with the name of the content type. Model (file)names are capitalized. It's easy to copy another model to bootstrap your new one.
- Add the model path to `models/index.js`.
- Use camelCased attributes - even if the API passes you under_scored ones. This is because `DataStore.js` in `/middleware` normalizes all incoming data.
- Write the relevant `GET_MODEL` actions and put them in the `state/action-types.js` file.
- Write your reducer(s) in `state/model/reducer.js`.
- Write your selectors in `state/model/selectors.js`. Use the [reselect library](https://github.com/reactjs/reselect) and immutable.js functions.
- Create a container component that binds the store data to props and pass that to a UI component.

### Directory Structure
* **app** - Code that runs in the browser
  * **components** - 'Dumb' view-only components that do not know what kind of information they represent.
  * **containers** - 'Smart' components that are connected to Redux. Preferably are not styled.
  * **resources** - Link components that represent a certain resource, such as 'person' or 'motion'.
  * **helpers** - Small, useful and re-usable pieces of code.
  * **middleware** - Deals with the API.
  * **models** - Contain models for resources that define its shape in the Redux store.
  * **routes** - All routing logic rests in its index.js file. Create a folder with an index.jsx for page components. In the future, these will rest in the Link folder as Page components.
  * **state** - Folders that contain all reducers, actions, selectors and respective tests.
* **bin** - Binaries
* **dev** - Helpers for developers, such as a nginx config and docker file.
* **server** - Node server
* **static** - Static files. Keep it to a minimum.
* **tests** - Application wide tests only. Try to put tests in the folder of the respective module.
* **webpack** - Configuration for your favorite bundler.

### Recommended Atom packages
- [Linter](https://atom.io/packages/linter) for a realtime linting experience.
  - [linter-eslint](https://atom.io/packages/linter-eslint)
  - [linter-sass-lint](https://atom.io/packages/linter-sass-lint)
- [language-babel](https://atom.io/packages/language-babel) for syntax highlighting and auto-indenting.
- [ternjs](https://atom.io/packages/atom-ternjs) for autocompletion.
- [docblockr](https://atom.io/packages/docblockr) for quick jsdoc comment generation.
- [nuclide](https://atom.io/packages/nuclide) for go-to-definition click, built-in debugging and Flow support.
- [nice index](https://atom.io/packages/nice-index) for displaying the component name instead of 'index.jsx' in the tabs.
- [project-manager](https://atom.io/packages/project-manager) for quickly swithing between projects
- [sort-lines](https://atom.io/packages/sort-lines) for sorting lines. Very useful, since both out sass and js linters require alphabetical sorting.
- [toggle-quotes](https://atom.io/packages/toggle-quotes) for switching between double and single quotes.

### Recommended Dev tools
- Chrome plugins: [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [Immutable formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog/related)
