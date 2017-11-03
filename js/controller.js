var addToPhoneBook = function () {
    var record = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
    if (validateNewRecord(record)) {
        PB.add(record);
    }
};

var validateNewRecord = function (record) {
    var valid_record = true;
    var validations = {
        name: RV.validateName(record.name),
        phone: RV.validatePhone(record.phone),
        email: RV.validateEmail(record.email)
    };

    for (key in record) {
        if (validations[key]) {
            valid_record = false;
            var error_el = document.getElementById(key + '-error');
            if (error_el) {
                error_el.innerHTML = validations[key];
            }
        }
    }

    return valid_record;
};

var clearErorrs = function (name) {
    element = document.getElementById(name + '-error');
    if(element) {
        element.innerHTML = '';
    }
}

var removeTableRow = function (id) {
    PB.remove(id);
};

var searchRecords = function () {
    PB.setPage(0);
    PB.reBuildTable();
};

var changeSort = function () {
    PB.reBuildTable();
}

var page = function (indx) {
    PB.setPage(indx);
    PB.reBuildTable();
}

var initialize = function () {
    window.PB = new PhoneBook({
        table_id: "phone-book-table",
        removeTableRow: 'removeTableRow',
        page: 'page',
        rowsPerPage: 3,
        limit: 100
    });
    window.RV = new Validator();
};

window.onload = initialize;