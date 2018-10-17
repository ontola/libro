const manageTranslations = require('react-intl-translations-manager').default;

const defaultLanguage = 'en-US';

manageTranslations({
  messagesDirectory: 'app/translations/extractedMessages/',
  translationsDirectory: 'app/translations/locales/',
  languages: ['nl-NL'],
});
