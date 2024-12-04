import { z } from 'zod';

// Define executive options as a constant
const executiveOptions = ['Mr.ABC', 'Ms.XYZ', 'Mrs.UVW'] as const;

// Centralized error messages for better maintainability
const errorMessages = {
  required: (field: string) => `${field} is required`,
  maxLength: (field: string, length: number) => `${field} must be ${length} characters or less`,
  minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  invalidType: 'Please select a valid option',
  invalidPhone: 'Phone number must be exactly 10 digits and start with 6-9',
  invalidEmail: 'Please provide a valid email address',
  invalidDate: 'Please provide a valid date',
  invalidName: 'Name must contain only letters and spaces',
  invalidCity: 'City must contain only letters and spaces',
  invalidCRMID: 'CRM ID must be in the correct format (e.g., CRM-2024-001)',
};

// Custom validation functions
const isValidPhone = (value: string) => /^[6-9]\d{9}$/.test(value);
const isValidName = (value: string) => /^[a-zA-Z\s]*$/.test(value);

const isValidEmail = (value: string) => 
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

// Customer Information Schemas
// Customer Information Schemas
const customerInfoSchemas = {
  customerName: z.string()
    .min(2, { message: errorMessages.minLength('Customer name', 2) })
    .max(50, { message: errorMessages.maxLength('Customer name', 50) })
    .refine(isValidName, { message: errorMessages.invalidName }),

  customerMobile: z.string()
    .length(10, { message: errorMessages.invalidPhone })
    .refine(isValidPhone, { message: errorMessages.invalidPhone }),

  customerEmail: z.string()
    .email({ message: errorMessages.invalidEmail })
    .max(100, { message: errorMessages.maxLength('Email', 100) })
    .refine(isValidEmail, { message: errorMessages.invalidEmail }),

  customerCity: z.string()
    .min(2, { message: errorMessages.minLength('City', 2) })
    .max(50, { message: errorMessages.maxLength('City', 50) })
    .refine(isValidName, { message: errorMessages.invalidCity }),

  customerState: z.enum(['Maharashtra', 'Dadra Nagar and Haveli', 'Punjab'])
    .refine((value) => value !== undefined, { message: errorMessages.invalidType }),

  customerProject: z.string()
    .trim()
    .min(2, { message: errorMessages.minLength('Project', 2) })
    .max(50, { message: errorMessages.maxLength('Project', 50) }),

  customerArchitect: z.string()
    .trim()
    .min(2, { message: errorMessages.minLength('Architect', 2) })
    .max(50, { message: errorMessages.maxLength('Architect', 50) })
    .refine(isValidName, { message: errorMessages.invalidName }),

  customerCRMID: z.string()
    .min(1, { message: errorMessages.required('CRM ID') })
    .max(50, { message: errorMessages.maxLength('CRM ID', 50) }),
};

// Executive Schemas
const executiveSchema = z.enum(executiveOptions, { 
  required_error: errorMessages.required('Executive'),
  invalid_type_error: errorMessages.invalidType 
});

// Date Schema with enhanced validation
const customerDeliveryDateSchema = z.string().refine((dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return !isNaN(date.getTime()) && date <= today && date >= oneYearAgo;
}, { message: 'Delivery Date must be within the last year and not in the future' });

const customerRemarkSchema = z.string()
  .trim()
  .min(1, { message: errorMessages.required('Remark') })
  .max(250, { message: errorMessages.maxLength('Remark', 250) });

const customerPaymentSchema = z.enum(['WIP', 'Paid', 'Pending'], { 
  required_error: errorMessages.required('Payment Status'),
  invalid_type_error: errorMessages.invalidType 
});

// Enhanced PPT Schema with required fields
const customerPPTSchema = z.object({
  bookMatch: z.boolean().default(false),
  quality: z.boolean().default(false),
  lotNo: z.boolean().default(false),
  size: z.boolean().default(false),
  qty: z.boolean().default(false),
  rate: z.boolean().default(false),
}).strict();

const customerActiveSchema = z.boolean()
  .default(true);

const customerSaveSchema = z.literal(true)
  .describe('Save status indicator');

const customerNewSchema = z.literal(true)
  .describe('New status indicator');

// Enhanced phone validation
const phoneNumberSchema = z.string()
  .regex(/^[6-9]\d{9}$/, { message: errorMessages.invalidPhone });

// Restricted executive options
const extendedExecutiveSchema = z.enum(executiveOptions, {
  required_error: errorMessages.required('Executive'),
  invalid_type_error: errorMessages.invalidType
});

export {
  customerInfoSchemas,
  customerDeliveryDateSchema,
  customerRemarkSchema,
  customerPaymentSchema,
  customerPPTSchema,
  customerActiveSchema,
  customerSaveSchema,
  customerNewSchema,
  executiveSchema as customerExecutiveSchema,
  executiveSchema as customerLeadGeneratorSchema,
  executiveSchema as customerTeamLeadSchema,
  phoneNumberSchema,
  customerDeliveryDateSchema as enhancedDeliveryDateSchema,
  extendedExecutiveSchema,
};