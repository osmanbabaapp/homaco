module.exports = {
  i18n: {
    locales: ["ar", "tr"],
    defaultLocale: "tr",
    // localeDetection: true,
    pages: {
      "*": ["common", "addad", "profile", "translation", "home"],
    },
    loadLocaleFrom: async (lang, ns) =>
      // You can use a dynamic import, fetch, whatever. You should
      // return a Promise with the JSON file.
      await require(`./locales/${lang}/${ns}.json`).then((m) => m.default),
  },
};
