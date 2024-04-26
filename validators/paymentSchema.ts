import { ZodSchema, z } from 'zod';
export const PaymentRegistrationSchema: ZodSchema<{
    id:string,
    paymentTitle:string
    paymentAmount:number,
    typeofPayment:string,
    paymentDate:Date,
    notesTobeAdded :string,
fromWho:string,
toWho:string,
 status:string,
}> = z.object({
    id: z.string().min(1, { message: 'ID is required' }) ,
    paymentTitle: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
    paymentAmount: z.number().min(2, 'Please enter a value between 2 and 50 characters.'),
    paymentDate: z.date().refine((value) => value < new Date(), { message: 'Please enter a valid date ' }),
    typeofPayment: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
  notesTobeAdded: z.string().min(2, 'Please enter a value between 2 and 50 characters.'),
  fromWho: z.string().min(2, 'Please enter a value between 2 and 50 characters.'),
  toWho: z.string().min(2, 'Please enter a value between 2 and 50 characters.'),
  status: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
});