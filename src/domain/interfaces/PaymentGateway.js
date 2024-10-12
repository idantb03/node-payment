class PaymentGateway {
    async processPayment(order, payment) {
        throw new Error('Method not implemented');
    }
}

module.exports = PaymentGateway;