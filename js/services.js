var getFirst = function(arr) {
    if (arr.length) {
        return arr[0]
    }
    return null
}

var sortPhoneBook = function (field) {
    return function (a, b) {
        if (field && a.hasOwnProperty(field) && b.hasOwnProperty(field)) {
            value1 = a[field];
            value2 = b[field];
        } else {
            return 0;
        }

        if (value1 > value2) {
            return 1;
        }
        if (value1 < value2) {
            return -1;
        }
        return 0;
    };
}

var startsWith = function (search_object) {
    return function(element) {
        var filtered = true;
        for(var item in search_object) {
            var search_word = search_object[item];
            var element_item = null;

            if (element) {
                 element_item = element[item];
            } else {
                continue;
            }

            if (search_word && element_item) {
                search_word = String(search_word);
                element_item = String(element_item);
            } else {
                continue;
            }

            filtered = element_item.indexOf(search_word) === 0;
            if (!filtered) {
                return filtered;
            }
        }
        return filtered;
    }
}
