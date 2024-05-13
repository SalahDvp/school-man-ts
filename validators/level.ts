
import { ZodObject,ZodSchema,z } from "zod";
const levelSchema: ZodSchema<{
  id: string;
    level: string;
    start: Date;
    end: Date;
    fee: number;
    status: "open" | "closed";
    registrationDeadline: Date;
    subjects: Array<{ value: string; label: string }>;
    prices: Array<any>;
    registrationAndInsuranceFee:number;
    feedingFee:number;
}> = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  start: z.date().refine((value) => value > new Date(), { message: 'Please enter a valid date' }),
  end: z.date().refine((value) => value > new Date(), { message: 'Please enter a valid date' }),
  fee: z.number().min(0, { message: 'Fee must be a positive number' }),
  status: z.enum(["open", "closed"]),
  registrationDeadline: z.date().refine((value) => value > new Date(), { message: 'Please enter a valid date' }),
  subjects: z.array(z.object({
      value: z.string(),
      label: z.string(),
  })).min(1, { message: 'At least one subject is required' }),
  prices: z.array(z.object({
      name: z.string(),
      period: z.string(),
      price: z.number(),
  })).min(1, { message: 'At least one method is required' }),
  registrationAndInsuranceFee:z.number(),
  feedingFee:z.number()
});

export default levelSchema;