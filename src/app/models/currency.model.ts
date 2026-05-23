export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyListResponse {
  success: boolean;
  currencies: Record<string, string>;
}

export interface ConvertResponse {
  success: boolean;
  query: { from: string; to: string; amount: number };
  info: { timestamp: number; quote: number };
  result: number;
}
