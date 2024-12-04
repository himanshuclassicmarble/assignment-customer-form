import { z } from 'zod';
import {
  customerInfoSchemas,
  customerDeliveryDateSchema,
  customerRemarkSchema,
  customerPaymentSchema,
  customerPPTSchema,
  customerActiveSchema,
  customerExecutiveSchema,
  customerLeadGeneratorSchema,
  customerTeamLeadSchema,
} from '../schemas/customerFormSchemas';

export const formSchema = z.object({
  ...customerInfoSchemas,
  executive: customerExecutiveSchema,
  leadGenerator: customerLeadGeneratorSchema,
  teamLead: customerTeamLeadSchema,
  deliveryDate: customerDeliveryDateSchema,
  remark: customerRemarkSchema,
  paymentStatus: customerPaymentSchema,
  ppt: customerPPTSchema,
  isActive: customerActiveSchema,
});

export type FormSchema = z.infer<typeof formSchema>;
export type PaymentStatusOptions = 'WIP' | 'Paid' | 'Pending';
export type StateOptions = 'Maharashtra' | 'Dadra Nagar and Haveli' | 'Punjab' | undefined;
export const executiveOptions = ['Mr.ABC', 'Ms.XYZ', 'Mrs.UVW'] as const;
export type ExecutiveOptions = typeof executiveOptions[number];
export type TeamLeadOptions = typeof executiveOptions[number];