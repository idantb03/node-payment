class ProcessPayment {
    constructor(paypalGateway, braintreeGateway, orderRepository) {
        this.paypalGateway = paypalGateway;
        this.braintreeGateway = braintreeGateway;
        this.orderRepository = orderRepository;
    }

    async execute(order, payment) {
        const gateway = this.selectGateway(order, payment);
        const response = await gateway.processPayment(order, payment);
        
        // Convert response to JSON
        const jsonResponse = JSON.stringify(response);
        
        try {
            await this.orderRepository.save(order, jsonResponse);
        } catch (error) {
            console.error('Error saving order:', error);
            // Proceed with the operation even if there's an error
        }
        
        return response;
    }

    selectGateway(order, payment) {
        const isAmex = payment.cardNumber.startsWith('34') || payment.cardNumber.startsWith('37');
        const allowedPaypalCurrencies = ['USD', 'EUR', 'AUD'];

        if (isAmex && order.currency !== 'USD') {
        throw new Error('AMEX is only possible to use for USD');
        }

        if (isAmex || allowedPaypalCurrencies.includes(order.currency)) {
        return this.paypalGateway;
        }

        return this.braintreeGateway;
    }
}

module.exports = ProcessPayment;
