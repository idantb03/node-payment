const PaymentGateway = require('../../domain/interfaces/PaymentGateway');
const braintree = require('braintree');

class BraintreeGateway extends PaymentGateway {
  constructor(merchantId, publicKey, privateKey) {
    super();
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: merchantId,
      publicKey: publicKey,
      privateKey: privateKey
    });
  }

  async processPayment(order, payment) {
    try {
      const result = await this.gateway.transaction.sale({
        amount: order.amount,
        creditCard: {
          number: payment.cardNumber,
          expirationMonth: payment.expirationMonth,
          expirationYear: payment.expirationYear,
          cvv: payment.cvv
        }
      });

      if (result.success) {
        return {
          transactionId: result.transaction.id,
          status: result.transaction.status
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw new Error(`Braintree payment failed: ${error.message}`);
    }
  }
}

module.exports = BraintreeGateway;