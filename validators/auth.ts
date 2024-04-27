import { ZodSchema, z } from 'zod';
export const studentRegistrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
  year: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date().nullable(),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  parentFirstName: z.string(),
  parentLastName: z.string(),
  parentEmail: z.string(),
  parentPhone: z.string(),
  emergencyContactName: z.string(),
  emergencyContactPhone: z.string(),
  medicalConditions: z.string().nullable(),
  status: z.string(),
  joiningDate: z.string(), // You may need to adjust this based on your actual date format
  leftAmountToPay: z.number(),
  registrationStatus: z.string(),
  startDate: z.string(), // You may need to adjust this based on your actual date format
  lastPaymentDate: z.string(), // You may need to adjust this based on your actual date format
  nextPaymentDate: z.string().nullable(), // You may need to adjust this based on your actual date format
  totalAmount: z.number(),
  amountLeftToPay: z.number(),
  value: z.string(),
  label: z.string(),
  parent: z.object({
    name: z.string(),
    id: z.string(),
  }),
  class: z.object({
    name: z.string(),
  }),
});
