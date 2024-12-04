import { z } from 'zod';

export const customerInfoSchemas = {
  customerName: z.string()
    .trim()
    .min(1, 'Customer name is required')
    .max(50, 'Customer name must be less than 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Customer name must contain only letters and spaces'),

  customerMobile: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Invalid mobile number. Must be 10 digits starting with 6-9'),

  customerCity: z.string()
    .trim()
    .min(1, 'City is required')
    .max(30, 'City name must be less than 30 characters')
    .regex(/^[A-Za-z\s]+$/, 'City name must contain only letters and spaces'),

  customerState: z.enum(['Maharashtra', 'Dadra Nagar and Haveli', 'Punjab'])
    .optional()
    .or(z.literal('')),

  customerProject: z.string()
    .trim()
    .min(1, 'Project name is required')
    .max(50, 'Project name must be less than 50 characters'),

  customerArchitect: z.string()
    .trim()
    .min(1, 'Architect name is required')
    .max(50, 'Architect name must be less than 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Architect name must contain only letters and spaces'),

  customerCRMID: z.string()
    .trim()
    .min(1, 'CRM ID is required')
    .max(20, 'CRM ID must be less than 20 characters')
    .regex(/^[A-Za-z0-9-]+$/, 'CRM ID must contain only letters, numbers, and hyphens'),
};

export const customerExecutiveSchema = z.enum(['Mr.ABC', 'Ms.XYZ', 'Mrs.UVW'])
  .optional()
  .or(z.literal(''));

export const customerLeadGeneratorSchema = z.enum(['Mr.ABC', 'Ms.XYZ', 'Mrs.UVW'])
  .optional()
  .or(z.literal(''));

export const customerTeamLeadSchema = z.enum(['Mr.ABC', 'Ms.XYZ', 'Mrs.UVW'])
  .optional()
  .or(z.literal(''));

export const customerDeliveryDateSchema = z.string()
  .trim()
  .min(1, 'Delivery date is required')
  .refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date('2000-01-01') && date < new Date('2050-12-31');
    },
    { message: 'Invalid date format or out of range' }
  );

export const customerRemarkSchema = z.string()
  .trim()
  .max(500, 'Remarks must be less than 500 characters')
  .optional();

export const customerPaymentSchema = z.enum(['WIP', 'Paid', 'Pending'])
  .optional()
  .or(z.literal(''));

export const customerPPTSchema = z.object({
  bookMatch: z.boolean(),
  quality: z.boolean(),
  lotNo: z.boolean(),
  size: z.boolean(),
  qty: z.boolean(),
  rate: z.boolean(),
});

export const customerActiveSchema = z.boolean();