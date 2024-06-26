import { ZodSchema, z } from 'zod';
const studentRegistrationSchema = z.object({
  id: z.string(),
  level: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth:z.date().refine((value:Date) => value < new Date(), { message: 'Please enter a valid date of birth.' }),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  parentFullName: z.string(),
  parentFirstName:z.string(),
  parentLastName:z.string(),
  parentEmail: z.string(),
  parentPhone: z.string(),
  parentId:z.string(),
  emergencyContactName: z.string(),
  emergencyContactPhone: z.string(),
  medicalConditions: z.string().nullable(),
  status: z.string(),
  joiningDate: z.date().refine((valuee:Date) => valuee < new Date(), { message: 'Please enter a valid date of birth.' }), // You may need to adjust this based on your actual date format
  registrationStatus: z.string(),
  startDate:z.date().refine((valueee:Date) => valueee < new Date(), { message: 'Please enter a valid date of birth.' }), // You may need to adjust this based on your actual date format
  lastPaymentDate: z.date(), // You may need to adjust this based on your actual date format
  nextPaymentDate: z.date(), // You may need to adjust this based on your actual date format
  totalAmount: z.number(),
  amountLeftToPay: z.number(),
  class: z.object({
    name: z.string(),
    id:z.string()
  }),
});

export default studentRegistrationSchema;