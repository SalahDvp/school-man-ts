import { ZodSchema, z } from 'zod';
const today = new Date();
export const studentRegistrationSchema: ZodSchema<{
  year: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalConditions: string | null;
}> = z.object({
  year: z.string().min(2, 'Please enter a value between 2 and 10 characters.').max(10, 'Please enter a value between 2 and 10 characters.'),
  firstName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  lastName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  dateOfBirth: z.date().refine((value) => value < new Date(), { message: 'Please enter a valid date of birth.' }),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
  city: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  state: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  postalCode: z.string().length(5, 'Please enter a 5-character postal code.'),
  country: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  parentFirstName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  parentLastName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  parentEmail: z.string().email('Please enter a valid email address.'),
  parentPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
  emergencyContactName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  emergencyContactPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
  medicalConditions: z.string().max(255).nullable(),
});