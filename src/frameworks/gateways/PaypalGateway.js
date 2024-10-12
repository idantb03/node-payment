const PaymentGateway = require('../../domain/interfaces/PaymentGateway');
const paypal = require('@paypal/checkout-server-sdk');

class PaypalGateway extends PaymentGateway {
  constructor(clientId, clientSecret) {
    super();
    if (!clientId || !clientSecret) {
      throw new Error('PayPal client ID and client secret are required');
    }
    this.environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    this.client = new paypal.core.PayPalHttpClient(this.environment);
  }

  async processPayment(order, payment) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: order.currency,
          value: order.amount
        }
      }]
    });

    try {
      const response = await this.client.execute(request);
      return {
        transactionId: response.result.id,
        status: response.result.status
      };
    } catch (error) {
      console.error('PayPal API Error:', error);
      if (error.statusCode) {
        console.error('Status Code:', error.statusCode);
      }
      throw new Error(`PayPal payment failed: ${error.message}`);
    }
  }
}

module.exports = PaypalGateway;