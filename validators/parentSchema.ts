import { ZodSchema, z } from 'zod';
export const ParentRegistrationSchema: ZodSchema<{
    id:string;
  year: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other' | string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  parentEmail: string;
  parentPhone: string;
  NumberOfChildren: number;
  secondParentName: string;
  secondParentPhone: string;
  payment: number;
  salary: number;
  paymentStatus:'Active' | 'Alert' | 'Warning';
}> = z.object({
id:z.string(),
  year: z.string().min(2, 'Please enter a value between 2 and 10 characters.').max(10, 'Please enter a value between 2 and 10 characters.'),
  firstName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  lastName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  dateOfBirth: z.date().refine((value) => value < new Date(), { message: 'Please enter a valid date of birth.' }),
  NumberOfChildren:z.number().min(0, 'Enter a valid value for children'),
  gender: z.enum(['male', 'female', 'other']),
  payment: z.number().min(0, 'Enter a valid value for total payment to be made'),
 salary: z.number().min(0, 'Enter a valid value for total payment to be made'),
 paymentStatus: z.enum(['Active' , 'Alert' , 'Warning']),
  address: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
  city: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  state: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  postalCode: z.string().length(5, 'Please enter a 5-character postal code.'),
  country: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  parentEmail: z.string().email('Please enter a valid email address.'),
  parentPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
  secondParentName: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  secondParentPhone: z.string().min(10, 'Please enter a value between 10 and 15 characters.').max(15, 'Please enter a value between 10 and 15 characters.'),
});