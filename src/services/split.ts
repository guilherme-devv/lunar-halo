/**
 * Split calculation helper for driver earnings
 * Voudpet takes 30%, driver keeps 70%
 */

const DRIVER_PERCENTAGE = 0.70;
const PLATFORM_PERCENTAGE = 0.30;

export interface SplitResult {
  gross: number;
  net: number;
  fee: number;
  driverPercentage: number;
  platformPercentage: number;
}

/**
 * Calculate the payment split from a gross ride value
 * @param grossValue - Total value charged to the customer
 * @returns Object with gross, net (driver), and fee (platform)
 */
export function calculateSplit(grossValue: number): SplitResult {
  const net = Math.round(grossValue * DRIVER_PERCENTAGE * 100) / 100;
  const fee = Math.round(grossValue * PLATFORM_PERCENTAGE * 100) / 100;

  return {
    gross: grossValue,
    net,
    fee,
    driverPercentage: DRIVER_PERCENTAGE * 100,
    platformPercentage: PLATFORM_PERCENTAGE * 100,
  };
}

/**
 * Format a split result for display
 */
export function formatSplit(split: SplitResult): {
  grossFormatted: string;
  netFormatted: string;
  feeFormatted: string;
} {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return {
    grossFormatted: formatter.format(split.gross),
    netFormatted: formatter.format(split.net),
    feeFormatted: formatter.format(split.fee),
  };
}

/**
 * Calculate split and return formatted values
 */
export function calculateAndFormatSplit(grossValue: number) {
  const split = calculateSplit(grossValue);
  const formatted = formatSplit(split);

  return {
    ...split,
    ...formatted,
  };
}
