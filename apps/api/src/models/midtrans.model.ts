interface TransactionDetails {
  order_id: string;
  gross_amount: number;
  payment_link_id?: string;
}

interface InstallmentTerms {
  bni: number[];
  mandiri: number[];
  cimb: number[];
  bca: number[];
  offline: number[];
}

interface Installment {
  required: boolean;
  terms: InstallmentTerms;
}

interface CreditCard {
  secure: boolean;
  bank: string;
  installment: Installment;
}

interface Expiry {
  start_time: string;
  duration: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks' | ' months' | 'years' | null;
}

interface ItemDetails {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  brand?: string;
  category?: string;
  merchant_name?: string;
}

interface CustomerDetails {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface IMidtransCreatePaymentLinkOption {
  transaction_details: TransactionDetails;
  customer_required?: boolean;
  credit_card?: CreditCard;
  usage_limit?: number;
  expiry?: Expiry;
  enabled_payments?: string[];
  item_details?: ItemDetails[];
  customer_details?: CustomerDetails;
  custom_field1?: string;
  custom_field2?: string;
  custom_field3?: string;
}

export type TMidtransPaymenLink = {
  order_id: string;
  payment_url: string;
};
