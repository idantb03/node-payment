class Payment {
    constructor(cardHolderName, cardNumber, expirationMonth, expirationYear, cvv) {
        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvv = cvv;
    }
}

module.exports = Payment;