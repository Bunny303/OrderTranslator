let LanguageHelper = {
    getLanguage: function (cookies) {
        if (cookies && cookies.lang) {
            return cookies.lang;
        }
        return 'en';
    }
};
module.exports = LanguageHelper;