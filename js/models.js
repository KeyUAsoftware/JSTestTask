var Record = function(data) {
    this.id = Math.random().toString(36).substr(2, 9);;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
};
