var PhoneBook = function(config) {
    this.table_id = config.table_id || 'phone-book';
    this.search_name_input = config.search_name_input || 'search-name';
    this.search_phone_input = config.search_phone_input || 'search-phone';
    this.search_email_input = config.search_email_input || 'search-email';

    this.limit = config.limit || 10000;
    this.rowsPerPage = config.rowsPerPage || 2;

    this.page = 0;
    this.rowCount = 0;
    this.records = {};
    this.current_records = [];
    this.table = document.getElementById(this.table_id);

    this.delete_button_template = '<button onclick="${func}(${index})">REMOVE</button>'.replace(
        '${func}',
        config.removeTableRow
    );
    this.pagination_el_template = '<button onclick="${func}(${index})" ${disabled}>${index}</button>'.replace(
        '${func}',
        config.page
    );

    this.__get_order_column = function () {
        var order = getFirst(document.querySelectorAll('[name="order"]:checked')).value;
        if (order == 'name') {
            return 'name';
        } else if (order == 'phone') {
            return 'phone';
        } else if (order == 'email') {
            return 'email';
        }
        return 'name';
    };

    this.__get_search_fields = function () {
        var searches = {
            name: document.getElementById(this.search_name_input).value || null,
            phone: document.getElementById(this.search_phone_input).value || null,
            email: document.getElementById(this.search_email_input).value || null,
        };
        return searches;
    };

    this.__message = function (text) {
        var thead = getFirst(this.table.getElementsByTagName('thead'))
        if (!thead) {
            alert(text);
            return;
        }
        var row = thead.insertRow(0);
        var cell = row.insertCell(0);
        cell.textContent = text;
        cell.colSpan = 4;
        setTimeout(function () {
            row.remove();
        }, 5000);
    };

    this.__getOrCreateTbody = function () {
        var tbody = this.table.getElementsByTagName('tbody')
        if (tbody.length) {
            tbody = tbody[0];
        } else {
            this.table.appendChild(document.createElement('tbody'));
            var tbody = this.table.getElementsByTagName('tbody');
        }
        return tbody;
    };

    this.__length = function () {
        return Object.keys(this.records).length;
    };

    return this;
};

PhoneBook.prototype = {
    add: function(contactInfo) {
        var new_record = new Record(contactInfo);
        if (this.__length() >= this.limit) {
            this.__message('You reached the limit in 10000 rows.');
            return;
        }
        this.records[new_record.id] = new_record;
        this.rowCount = this.table.rows.length - 1;
        this.reBuildTable();
    },

    remove: function(id) {
        if (id in this.records) {
            delete this.records[id];
            row = document.getElementById(id);
            if (row) {
                row.remove();
                this.reBuildTable();
            }
        }
    },

    search: function(searches) {
        return this.current_records.filter(startsWith(searches));;
    },

    list: function(contactsPerPage, page) {
        var start = contactsPerPage * page;
        return this.current_records.slice(start, start + contactsPerPage);
    },

    insertRow: function (record) {
        tbody = this.__getOrCreateTbody();
        var row = tbody.insertRow(tbody.rows.length);
        row.setAttribute("id", record.id);
        row.insertCell(0).textContent = record.name;
        row.insertCell(1).textContent = record.phone;
        row.insertCell(2).textContent = record.email;
        row.insertCell(3).innerHTML = this.delete_button_template.replace('${index}', ["'", record.id, "'"].join(''));
    },

    reBuildTable: function () {
        var order_by = this.__get_order_column();
        var old_tbody = this.__getOrCreateTbody();
        this.table.replaceChild(document.createElement('tbody'), old_tbody);

        this.clearCurrentRecords();
        var searches = this.__get_search_fields();
        this.current_records = this.search(searches);
        this.current_records = this.current_records.sort(sortPhoneBook(order_by));
        var sliced_values = this.list(this.rowsPerPage, this.page);

        for(indx in sliced_values) {
            this.insertRow(sliced_values[indx]);
        }
        this.buildPagination();
    },

    clearCurrentRecords: function () {
        this.current_records = Object.values(this.records);
    },

    buildPagination: function () {
        if (this.current_records.length >= this.rowsPerPage) {
            var tbody = this.__getOrCreateTbody();
            var row = tbody.insertRow(tbody.rows.length);
            var cell = row.insertCell(0);
            cell.colSpan = 4;
            var html = '';
            for (var i=0; i < Math.ceil(this.current_records.length / this.rowsPerPage); i++) {
                var button = this.pagination_el_template.replace('${index}', String(i)).replace('${index}', String(i+1));
                if (i == this.page) {
                    button = button.replace('${disabled}', 'disabled');
                } else {
                    button = button.replace('${disabled}', '');
                }
                html += button;
            }
            cell.innerHTML = html;
        }
    },

    setPage: function (page) {
        try {
            page = parseInt(page);
            this.page = page;
        } catch(err) {};
    }
};