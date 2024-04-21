import { ZodSchema, z } from 'zod';
const today = new Date();
export const teacherRegistrationSchema: ZodSchema<{
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
  teacherEmail: string;
  teacherPhone: string;
  teacherSubject: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalConditions: string | null;
  salary: string| null;
}> = z.object({
  year: z.string().min(2, 'Please enter a value between 2 and 10 characters.').max(10, 'Please enter a value between 2 and 10 characters.'),
  firstName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  lastName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  dateOfBirth: z.date().refine((value) => value < new Date(), { message: 'Please enter a valid date of birth.' }),
  gender: z.enum(['male', 'female', 'other']),
  salary: z.string().min(0,'enter a valid value'),
  address: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
  city: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  state: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  postalCode: z.string().length(5, 'Please enter a 5-character postal code.'),
  country: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  teacherSubject: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  teacherEmail: z.string().email('Please enter a valid email address.'),
  teacherPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
  emergencyContactName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  emergencyContactPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
  medicalConditions: z.string().max(255).nullable(),
});