# Express.js with PayPal, Braintree, and Prisma

This project is an Express.js application that integrates PayPal and Braintree for payment processing and Prisma for database management.

## Features

- **Express.js**: Web framework for Node.js, handling the server-side application logic.
- **PayPal Integration**: Accept payments using PayPal's REST API.
- **Braintree Gateway**: Process payments securely with Braintree, including credit cards and PayPal.
- **Prisma ORM**: Manage database queries and migrations using Prisma, an Object-Relational Mapping tool.

## Getting Started

1. **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure environment variables**:

    Create a `.env` file in the root directory and set the following variables:

    ```bash
    DATABASE_URL=postgresql://username:password@localhost:5432/mydb
    PAYPAL_CLIENT_ID=your-paypal-client-id
    PAYPAL_CLIENT_SECRET=your-paypal-client-secret
    BRAINTREE_MERCHANT_ID=your-braintree-merchant-id
    BRAINTREE_PUBLIC_KEY=your-braintree-public-key
    BRAINTREE_PRIVATE_KEY=your-braintree-private-key
    ```

4. **Run database migrations**:

    Before running the app, ensure your database schema is up to date by running:

    ```bash
    npx prisma migrate dev
    ```

5. **Start the application**:

    To start the Express.js server, run:

    ```bash
    npm run start
    ```

    The application will be accessible at `http://localhost:3000`.

## Scripts

- `npm run start`: Starts the application.
