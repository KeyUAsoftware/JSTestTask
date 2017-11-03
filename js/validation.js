var Validator = function () {
    this.__toString = function (value) {
        return String(value);
    }

    this.email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.phone_re = /^\d{2}\-\d{3}\-\d{4}$/g;

};

Validator.prototype = {
    validateName: function (name) {
        name = this.__toString(name);
        if (name.length > 100) {
            return 'Name should be less then 100 characters';
        }
        if (!name.length) {
            return 'Fill name fields';
        }
        return false;
    },

    validatePhone: function (phone) {
        phone = this.__toString(phone);
        if (!new RegExp(this.phone_re).test(phone)) {
            return 'Phone should be in next format: xx-xxx-xxxx';
        }
        return false;
    },

    validateEmail: function (email) {
        email = this.__toString(email);
        if (!new RegExp(this.email_re).test(email)) {
            return 'Incorrect email';
        }
        return false;
    }
};