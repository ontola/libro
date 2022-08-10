// @ts-check

const locales = ['en', 'nl'];

const printDifference = (keys) => {
  const [
    refLang,
    ...others
  ] = keys;
  const reference = new Set(refLang);

  console.log('test', others.length);
  for (let i = 0; i < others.length; i++) {
    console.log(`---- Locale '${locales[i + 1]}' ----`);

    for (const term of others[i]) {
      if (!reference.has(term)) {
        console.log(`+ ${term}`)
      }
    }

    const other = new Set(others[i]);
    for (const term of reference) {
      if (!other.has(term)) {
        console.log(`- ${term}`)
      }
    }

    console.log(`---- Locale '${locales[i + 1]}' end ----`);
  }
};

const files = locales.map((l) => import(`../app/translations/${l}.json`, { assert: { type: 'json' } }));

const contents = await Promise.all(files);
const keys = contents.map((c) => Object.keys(c.default));
const lengths = new Set(keys.map((c) => c.length));

if (lengths.size > 1) {
  console.error(`Some translations have too few or many keys (got lengths ${Array.from(lengths).join(', ')})`);
  printDifference(keys)

  process.exit(1);
}


console.info(`Found ${lengths.values().next().value} translation entries`);
