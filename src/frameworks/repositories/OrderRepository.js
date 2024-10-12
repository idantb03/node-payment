const { PrismaClient } = require('@prisma/client');

class OrderRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(order, paymentResponse) {
        const transactionData = {
            ...order,
            paymentResponse: JSON.parse(paymentResponse),
            createdAt: new Date()
        };

        return this.prisma.transaction.create({
            data: {
                data: transactionData
            }
        });
    }
}

module.exports = OrderRepository;
