class Order {
    constructor(amount, currency, customerFullName) {
        this.amount = amount;
        this.currency = currency;
        this.customerFullName = customerFullName;
    }
}

module.exports = Order;