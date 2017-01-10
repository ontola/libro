const path = require('path');
const webpackCommonConfig = require('./webpack/common.config.js');

module.exports = {
  title: 'Argu React Style Guide',
  // For some reason, Styleguidist crashes when I try to import all components. Perhaps this
  // has to do something with redux or our webpack setup?
  // TODO: Initialize redux store: https://github.com/styleguidist/react-styleguidist/issues/277
  // components: './app/components/**/[A-Z]*.jsx',
  // components: './app/components/**/*.jsx',
  // Let's try to create a whitelist and add 'em one by one:
  components: () => {
    const componentsArray = [];
    // Every component that is tested, but does not work is commented out.
    const componentNames = [
      'Button',
      'Cover',
      'Tag',
      'Card',
      // 'ArgumentForm',
      // 'ArgumentListItem',
      // 'ArgumentShow',
      'Attachment',
      'BackButton',
      // 'BottomBar',
      // 'BottomBarButton',
      // 'ChronoFeed',
      // 'ChronoItem',
      'Collapsible',
      // 'Collection',
      'Columns',
      // 'Comment',
      // 'CompareVotesBar',
      'Container',
      // 'Detail',
      // 'DetailDate',
      // 'DetailDuration',
      'DetailsBar',
      // 'DetailStatus',
      // 'DetailType',
      // 'DetailVotedFor',
      'DonutChart',
      // 'Drawer',
      'Error',
      // 'EventItemShow',
      // 'EventListItem',
      // 'EventShow',
      'FormField',
      'GeneratedIcon',
      // 'Header',
      'Heading',
      'HoverBox',
      // 'HyperDropdown',
      'LabelValue',
    ];
    componentNames.forEach(name =>
      componentsArray.push(`./app/components/${name}/index.jsx`)
    );
    const componentPaths = [
      './app/components/Card/CardActions.jsx',
      // './app/components/Card/CardButton.jsx', // Crashes when it imports the Button component
      './app/components/Card/CardContent.jsx',
      './app/components/Card/CardHeader.jsx',
      './app/components/Card/CardRow.jsx',
    ];
    componentPaths.forEach(thePath =>
      componentsArray.push(thePath)
    );
    return componentsArray;
  },
  serverPort: 5000,
  sections: [
    // Crashes for some reason
    // {
    //   name: 'Card Components',
    //   content: './app/components/Card/Card.md',
    //   components: './app/components/Card/*.jsx',
    // },
  ],
  showCode: false,
  updateWebpackConfig: ((webpackConfig) => {
    Object.assign(webpackConfig.resolve.alias, webpackCommonConfig.resolve.alias);
    webpackConfig.entry.push(path.join(__dirname, 'app/components/shared/styleguide.scss'));
    webpackConfig.entry.unshift(path.join(__dirname, 'app/components/shared/init.scss'));
    webpackConfig.module.loaders.push({
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'app'),
      loader: 'style!css-loader!postcss-loader!sass-loader',
    });
    return webpackConfig;
  }),
};
