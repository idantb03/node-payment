const express = require('express');
const PaymentController = require('../../frameworks/controllers/PaymentController')
const ProcessPayment = require('../../use-cases/ProcessPayment');
const PaypalGateway = require('../../frameworks/gateways/PaypalGateway');
const BraintreeGateway = require('../../frameworks/gateways/BraintreeGateway');
const OrderRepository = require('../../frameworks/repositories/OrderRepository');
const config = require('../../infrastructure/config/config');

const paymentRouter = express.Router();

const paypalGateway = new PaypalGateway(config.paypal.clientId, config.paypal.clientSecret);
const braintreeGateway = new BraintreeGateway(config.braintree.merchantId, config.braintree.publicKey, config.braintree.privateKey);
const orderRepository = new OrderRepository();
const processPaymentUseCase = new ProcessPayment(paypalGateway, braintreeGateway, orderRepository);
const paymentController = new PaymentController(processPaymentUseCase);

paymentRouter.post('/process-payment', (req, res) => paymentController.handlePayment(req, res));

module.exports = { paymentRouter };