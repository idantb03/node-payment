module.exports = {
    paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID || 'AZu2IvqEwZ__WrpyvHNu0RgQLcqTuLu_uNYoPm-lLLhLxnzKTHWALOqbLUBL_sClJMOS_J3zm6Q6YyAS',
        clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'EDKuv-jYqGS3N_gs6_umcJeLIDnN640nSL06mJmjk-C1BQb7Mx3lxA3IyNSkJcJB176kNdrQC80Ctwtd'
    },
    braintree: {
        merchantId: process.env.BRAINTREE_MERCHANT_ID || '5nyrjp9kbkd355rd',
        publicKey: process.env.BRAINTREE_PUBLIC_KEY || 'fz7vzjfdq4wygjtj',
        privateKey: process.env.BRAINTREE_PRIVATE_KEY || '011f85b7834238307defdaa47ba99c18'
    }
};