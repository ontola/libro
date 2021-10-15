# Argu front-end
Front-end application for [Argu](https://argu.co).

## Usage
- `npm install` or `yarn` to install dependencies. [Yarn](https://yarnpkg.com) is similar to NPM, but better. Follow the [Yarn installation instructions](https://yarnpkg.com/en/docs/install) for your OS.
- Create a [.env file](https://www.npmjs.com/package/dotenv) by copying `.env.template`.
- `yarn run start` to start the server with backend connection or `yarn run standalone` for RDF Studio only.
- Visit [http://localhost:3001/](http://localhost:3001/) or [http://localhost:3001/d/studio](http://localhost:3001/d/builder)

## Contributing
All tests and linters will be run automatically as a pre-commit hook.
- `yarn run build` to generate all the build files under `/dist`
- `yarn run lint` to run the ES linter. See .eslintrc for the plugins and exceptions to the recommended set used.
- `yarn run lint:style` to run the SASS linter.
- `yarn run test` to run all tests.
- `yarn run secure` to run security test.

### Directory Structure
* **app** - Code that runs in the browser
  * **components** - 'Dumb' view-only components that do not know what kind of information they represent.
  * **containers** - 'Smart' components that are connected to Redux. Preferably are not styled. Mostly deprecated by Link.
  * **resources** - Link components that represent a certain resource, such as 'person' or 'motion'.
  * **helpers** - Small, useful and re-usable pieces of code.
  * **middleware** - Deals with the API.
  * **models** - Contain models for resources that define its shape in the Redux store.
  * **routes** - All routing logic rests in its index.js file. Create a folder with an index.jsx for page components. In the future, these will rest in the Link folder as Page components.
  * **state** - Folders that contain all reducers, actions, selectors and respective tests.
  * **translations** - Stores current translations. See the I18n chapter.
  * **views** - Link view components. Properties are stored in the parent resource.
* **bin** - Binaries
* **dev** - Helpers for developers, such as a nginx config and docker file.
* **dist** - Generated and managed by the build scripts. Here are the distribution files stored, they aren't necessarily public.
* **server** - Node server
* **static** - Static files. Keep it to a minimum.
* **tests** - Application wide tests only. Try to put tests in the folder of the respective module.
* **webpack** - Configuration for your favorite bundler.

### Styling & theming
We're migrating our styles to `@material/styles` objects, using the [makeStyles hook](https://material-ui.com/styles/basics/).
This enables us to use runtime-overwritable custom themes in combination with the Material-ui components.
If you need to edit styles written in SCSS, convert them to `makeStyles` objects.
If you need theme-dependent styles, use the theme object.
Variables (colors, widths, spacing, font-size) should be taken from the `theme` object that is passed through `makeStyles`.
These can be modified (for the default theme) in `app/themes/common/variables.js`.

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

#### Markers
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

### I18n
Internationalization is done via [react-intl](https://github.com/yahoo/react-intl).

Do not touch the `en.json` and all `*.json` files in /app/lang, they are autogenerated from source.

#### Adding a translation
1. Use the translation in code
2. Run the `t10s:extract` script, take note of any warning or errors (esp. duplicates)
3. Add the key and translation to the other locales.
4. Run the `t10s:compile` script
5. Commit

***CAUTION:*** When deleting translations (e.g. removing a react-intl component), make sure to
manually search/check and update the translations files to ensure consistency.

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
- Feature tests: TBD
- View tests: `app/views/MenuItem/MenuItem.spec.js`
- Unit tests: `app/components/Button/Button.spec.js`

#### Harvesting data
The feature and view tests require data to be feeded into the system, but since we don't have a
factory system yet, the data needs to be harvested manually for the time being. Luckily,
snapshot-testing compatible JS data can be obtained by running `dev.snapshot()` on the desired LOC
in the browser console.

### Async
Components which are to be resolved via webpack async functionality. They shouldn't be loaded
directly in the code, use their loaders instead, which should be in either components or containers.

These may not contain all async-loaded components (e.g. The pdf component is loaded directly from
the dependency).

### Components
- In this project, `components` are merely [presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) / display / UI components that should not represent any specific kind of concept. You can compare them to bootstrap components. Components should not fetch any data and should not be connected to redux. They also should not contain any components that fetch data. That's what Containers and Resources are responsible for.
- Name them as abstract as possible. That makes the component more re-usable.
- Use stateless functional components whenever possible to enhance performance.
- Use PropTypes and add a comment above non-obvious props `/** like this */`.
- Document components like all other functions with JSdoc.

### Views (using Link)
- Views represent real world concepts, such as a person, a document, an event or an organization.
- They are rendered using `link-lib` and `link-redux`, which respectively deal with managing the data and making it accessible to use in React components.
- Views should not contain any styling of themselves. Don't re-use classesnames from other components.They are composed of Components.
- Views can be rendered in various context (i.e. in its own page, as a small list item or as a card in some list). We call such a context a **topology**. We have predefined a couple of topologies:
  - **(default)** - The view that is used on the route / page. `LinkedObjectContainers` with an undefined topology render as default.
  - **Container** - A large column, often with cards inside it. Used on the Question page, or the Argument columns.
  - **Card** - Inside a card.
  - **CardMain** - Inside the card of the resource from the current URL. Makes the title bigger.
  - **CardFixed** - Inside a card with fixed dimensions.
  - **Detail** - Shown in the DetailsBar, should be a small piece of metadata.
  - **Parent** - Shown on top of a page to convey the hierarchy of the site.
  - **Inline** - A text to appear in some other text. Can be a link.
  - **Sidebar** - An item in the side menu.

### Adding a new view
- Create a folder in `app/views` with the name of your view (e.g. `Person` if it renders a `foaf:Person`). Add a `index.jsx` file.
- When naming your component, name them as `propertyTopology` and `TypeTopology`. For example: `nameCard` or `MotionContainer`.

### Debugging Link
So, your Link View / Property isn't showing. Check the following:
- Is the request handled correctly? Check the `network` tab in your browser's debugger view.
- Is the data parsed correctly?
- Is the component present in the virtual DOM? Use the react debugging tools to find the component. Does it contain the Property components that you expect it to have?
- If there is a component, check its contents by clicking its LinkedObjectContainer in the debugging tools and running `dev.data` in the console.
- Is the View or the Property being registered correctly? Use LRS.

### Recommended Dev tools
- Chrome plugins: [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
