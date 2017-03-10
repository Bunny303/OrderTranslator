let configauth = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            if (req.session) {
                req.session.redirectUrl = req.originalUrl || req.url;

                if (req.body) {
                    req.session.redirectBody = req.body;
                }

                if (req.file) {
                    req.session.redirectFile = req.file;
                }
            }
            res.redirect('/users/login');
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.user && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                res.redirect('/users/login');
            }
        }
    }
};

module.exports = configauth;