// Pricing Service - Mock Asaas Integration
// Calculates ride estimates based on distance and pet count

export interface PriceBreakdownItem {
  label: string;
  value: number;
}

export interface PriceEstimate {
  total: number;
  formattedTotal: string;
  breakdown: PriceBreakdownItem[];
}

// Currency formatter for BRL
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

// Pricing constants
const BASE_FARE = 10.0; // R$ 10,00 base
const PER_KM_RATE = 2.5; // R$ 2,50 per km
const EXTRA_PET_FEE = 5.0; // R$ 5,00 per extra pet
const MIN_FARE = 12.0; // Minimum fare

/**
 * Calculate ride estimate based on distance and pet count
 * @param distanceKm - Distance in kilometers
 * @param petsCount - Number of pets
 */
export function calculateEstimate(
  distanceKm: number,
  petsCount: number
): PriceEstimate {
  const breakdown: PriceBreakdownItem[] = [];

  // Base fare
  breakdown.push({
    label: 'Tarifa Base',
    value: BASE_FARE,
  });

  // Distance fee
  const distanceFee = distanceKm * PER_KM_RATE;
  breakdown.push({
    label: `Distância (${distanceKm.toFixed(1)} km × ${formatCurrency(PER_KM_RATE)})`,
    value: distanceFee,
  });

  // Extra pets fee (first pet is included in base)
  const extraPets = Math.max(0, petsCount - 1);
  if (extraPets > 0) {
    const petsFee = extraPets * EXTRA_PET_FEE;
    breakdown.push({
      label: `Pets Adicionais (${extraPets} × ${formatCurrency(EXTRA_PET_FEE)})`,
      value: petsFee,
    });
  }

  // Calculate total
  let total = breakdown.reduce((sum, item) => sum + item.value, 0);

  // Apply minimum fare
  if (total < MIN_FARE) {
    const adjustment = MIN_FARE - total;
    breakdown.push({
      label: 'Ajuste Tarifa Mínima',
      value: adjustment,
    });
    total = MIN_FARE;
  }

  return {
    total,
    formattedTotal: formatCurrency(total),
    breakdown,
  };
}

// Payment method types
export type PaymentMethod = 'pix' | 'credit_card' | 'boleto';

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
  rideId: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

/**
 * Mock payment processing (simulates Asaas API)
 * @param request - Payment request
 * @returns Promise resolving after 3 seconds
 */
export async function processPayment(
  request: PaymentRequest
): Promise<PaymentResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock success response
  return {
    success: true,
    transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    message: getSuccessMessage(request.method),
  };
}

function getSuccessMessage(method: PaymentMethod): string {
  switch (method) {
    case 'pix':
      return 'Pagamento PIX aprovado! Motoristas sendo notificados.';
    case 'credit_card':
      return 'Pagamento aprovado! Motoristas sendo notificados.';
    case 'boleto':
      return 'Boleto gerado! Após confirmação, motoristas serão notificados.';
    default:
      return 'Pagamento processado com sucesso!';
  }
}
