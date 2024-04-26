import { z } from "zod";

 const classSchema = z.object({
  name: z.string().min(1).max(255).min(1,"Name is required and must be between 1 and 255 characters"),
  level: z.object({
    name: z.string().min(1,"Level name is required"),
    id: z.string().min(1,"Level ID is required"),
  }).nullable(),
  className: z.string().min(1,"Class name is required"),
  capacity: z.number().int().min(1).max(9999).min(1,"Capacity is required and must be between 1 and 9999"),
  teachers: z.array(
    z.object({
      name: z.string().min(1,"Teacher name is required"),
      id: z.string().min(1,"Teacher ID is required"),
    })
  ),
  mainTeacher: z.object({
    name: z.string().min(1,"Main teacher name is required"),
    id: z.string().min(1,"Main teacher ID is required"),
  }),
  mainStudent: z.object({
    name: z.string().min(1,"Main student name is required"),
    id: z.string().min(1,"Main student ID is required"),
  }),
  students: z.array(
    z.object({
      name: z.string().min(1,"Student name is required"),
      id: z.string().min(1,"Student ID is required"),
    })
  ),
});
export default classSchema