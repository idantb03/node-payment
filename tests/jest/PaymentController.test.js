const PaymentController = require('../../src/frameworks/controllers/PaymentController');
const Order = require('../../src/domain/entities/Order');
const Payment = require('../../src/domain/entities/Payment');

describe('PaymentController', () => {
  let paymentController;
  let mockProcessPaymentUseCase;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockProcessPaymentUseCase = {
      execute: jest.fn()
    };
    paymentController = new PaymentController(mockProcessPaymentUseCase);

    mockReq = {
      body: {
        amount: 100,
        currency: 'USD',
        customerFullName: 'John Doe',
        cardHolderName: 'John Doe',
        cardNumber: '4111111111111111',
        expirationMonth: '12',
        expirationYear: '2025',
        cvv: '123'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should process payment successfully', async () => {
    const mockResult = { transactionId: '123', status: 'SUCCESS' };
    mockProcessPaymentUseCase.execute.mockResolvedValue(mockResult);

    await paymentController.handlePayment(mockReq, mockRes);

    expect(mockProcessPaymentUseCase.execute).toHaveBeenCalledWith(
      expect.any(Order),
      expect.any(Payment)
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Payment processed successfully',
      result: mockResult
    });
  });

  test('should return 400 if required fields are missing', async () => {
    mockReq.body = {};

    await paymentController.handlePayment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Missing required fields'
    });
  });

  test('should handle payment processing errors', async () => {
    const errorMessage = 'Payment failed';
    mockProcessPaymentUseCase.execute.mockRejectedValue(new Error(errorMessage));

    await paymentController.handlePayment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: errorMessage
    });
  });
});