import { z } from "zod";
export const profileFormSchema = z.object({
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    bio: z.string().max(160).min(4),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
    schoolName: z.string().min(1, { message: "School name is required." }),
    phoneNumber: z.string().regex(/^\+\d{1,3} \d{1,14}$/, {
      message: "Phone number must be in the format +[country code] [number].",
    }),
    capacity: z.number().min(1, { message: "Capacity must be at least 1." }),
    nationalRanking: z
      .number()
      .min(1, { message: "Ranking must be at least 1." }),
    address: z.string().min(1, { message: "Address is required." }),
    openDays: z
    .array(
      z.object({
        day: z.string(),
        start:z.string(),
        end:z.string(),
        state:z.enum(['open', 'close'])
      })
    )
    .optional(),
  });