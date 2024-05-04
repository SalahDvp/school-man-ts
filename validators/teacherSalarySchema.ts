import { ZodSchema, z } from 'zod';

const today = new Date();

export const teacherPaymentRegistrationSchema: ZodSchema<{
   
  salaryTitle: string;
  salaryAmount: number;
  salaryDate: Date;
  typeofTransaction: string;
  monthOfSalary: string;
  fromWho: string;
  teacher:{name:string;id:string};

  status: string;
}> = z.object({
    teacher:z.object({name:z.string(),id:z.string()}),
    salaryTitle: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
    salaryAmount: z.number().min(2, 'Please enter a value between 2 and 50 characters.'),
    salaryDate: z.date().refine((value:Date) => value < new Date(), { message: 'Please enter a valid date ' }),
    typeofTransaction: z.string().min(5, 'Please enter a value between 5 and 255 characters.').max(255, 'Please enter a value between 5 and 255 characters.'),
    monthOfSalary: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'),
   fromWho: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'), 
  status: z.string().min(2, 'Please enter a value between 2 and 50 characters.').max(50, 'Please enter a value between 2 and 50 characters.'), 

})