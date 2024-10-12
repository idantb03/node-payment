const ProcessPayment = require('../../src/use-cases/ProcessPayment');
const Order = require('../../src/domain/entities/Order');
const Payment = require('../../src/domain/entities/Payment');

describe('ProcessPayment', () => {
  let processPayment;
  let mockPaypalGateway;
  let mockBraintreeGateway;
  let mockOrderRepository;

  beforeEach(() => {
    mockPaypalGateway = {
      processPayment: jest.fn()
    };
    mockBraintreeGateway = {
      processPayment: jest.fn()
    };
    mockOrderRepository = {
      save: jest.fn()
    };
    processPayment = new ProcessPayment(mockPaypalGateway, mockBraintreeGateway, mockOrderRepository);
  });

  test('should use PayPal for AMEX cards with USD currency', async () => {
    const order = new Order(100, 'USD', 'John Doe');
    const payment = new Payment('John Doe', '371234567890123', '12', '2025', '123');

    await processPayment.execute(order, payment);

    expect(mockPaypalGateway.processPayment).toHaveBeenCalledWith(order, payment);
    expect(mockBraintreeGateway.processPayment).not.toHaveBeenCalled();
  });

  test('should use PayPal for allowed currencies', async () => {
    const order = new Order(100, 'EUR', 'Jane Doe');
    const payment = new Payment('Jane Doe', '4111111111111111', '12', '2025', '123');

    await processPayment.execute(order, payment);

    expect(mockPaypalGateway.processPayment).toHaveBeenCalledWith(order, payment);
    expect(mockBraintreeGateway.processPayment).not.toHaveBeenCalled();
  });

  test('should use Braintree for non-AMEX cards and non-PayPal currencies', async () => {
    const order = new Order(100, 'GBP', 'Bob Smith');
    const payment = new Payment('Bob Smith', '5555555555554444', '12', '2025', '123');

    await processPayment.execute(order, payment);

    expect(mockBraintreeGateway.processPayment).toHaveBeenCalledWith(order, payment);
    expect(mockPaypalGateway.processPayment).not.toHaveBeenCalled();
  });

  test('should throw an error for AMEX cards with non-USD currency', async () => {
    const order = new Order(100, 'EUR', 'Alice Johnson');
    const payment = new Payment('Alice Johnson', '371234567890123', '12', '2025', '123');

    await expect(processPayment.execute(order, payment)).rejects.toThrow('AMEX is only possible to use for USD');
  });

  test('should save order after successful payment', async () => {
    const order = new Order(100, 'USD', 'John Doe');
    const payment = new Payment('John Doe', '4111111111111111', '12', '2025', '123');
    const mockResponse = { transactionId: '123', status: 'SUCCESS' };

    mockPaypalGateway.processPayment.mockResolvedValue(mockResponse);

    await processPayment.execute(order, payment);

    expect(mockOrderRepository.save).toHaveBeenCalledWith(order, mockResponse);
  });
});