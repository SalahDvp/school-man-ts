import { ZodSchema, z } from 'zod';
const today = new Date();
export const PaymentRegistrationSchema: ZodSchema<{
  
  Paymenttitle: string;
  Paymentamount: string;
  Paymentdate: Date;
  Typeofpayment: string;
  Notestobeadded: string;
  Fromwho: string;
  towho: string;
  status: string;
  
}> = z.object({
  Paymenttitle: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  Paymentamount: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  Paymentdate: z.date().refine((value) => value < new Date(), { message: 'Please enter a valid date ' }),
  Typeofpayment: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
  Notestobeadded: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  Fromwho: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  towho: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
  status: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
});