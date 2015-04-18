'use strict';

function User(args) {
    if (args) {
        this.name = args.name;
        this.role = args.role;
        this.password = args.password;
        this.permissions = args.permissions || {};
    }
}

User.prototype.isAdmin = function () {
    return this.role === 'Admin';
};

User.prototype.isLoggedIn = function () {
    return !!this.role && !!this.password;
};

User.prototype.isSecurityTabAllowed = function () {
    return this.permissions.securityTab;
};

User.prototype.isUpdateTabAllowed = function () {
    return this.permissions.updateTab;
};

module.exports = User;