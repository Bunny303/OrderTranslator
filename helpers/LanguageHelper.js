let LanguageHelper = {
    getLanguage: function (session) {
        if (session && session.lang) {
            return session.lang;
        }
        return 'en';
    }
};
module.exports = LanguageHelper;