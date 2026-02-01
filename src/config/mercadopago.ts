// Mercado Pago Configuration
// Uses Payment Brick for checkout integration

export const MERCADO_PAGO_PUBLIC_KEY = 'TEST-c6eeee48-6c32-4895-b1df-883bfbcb7741';

// Environment
export const IS_SANDBOX = MERCADO_PAGO_PUBLIC_KEY.startsWith('TEST-');

// Locale based on country
export const MP_LOCALE = 'pt-BR';
