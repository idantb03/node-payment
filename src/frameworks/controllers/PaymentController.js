const Order = require('../../domain/entities/Order');
const Payment = require('../../domain/entities/Payment');

class PaymentController {
  constructor(processPaymentUseCase) {
    this.processPaymentUseCase = processPaymentUseCase;
  }

  async handlePayment(req, res) {
    try {
      const { amount, currency, customerFullName, cardHolderName, cardNumber, expirationMonth, expirationYear, cvv } = req.body;

      if (!amount || !currency || !customerFullName || !cardHolderName || !cardNumber || !expirationMonth || !expirationYear || !cvv) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const order = new Order(amount, currency, customerFullName);
      const payment = new Payment(cardHolderName, cardNumber, expirationMonth, expirationYear, cvv);

      const result = await this.processPaymentUseCase.execute(order, payment);

      res.status(200).json({ success: true, message: 'Payment processed successfully', result });
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = PaymentController;