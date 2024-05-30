import { z } from 'zod';
import { months, semesterCodes, semesterNames } from './academicSemester.constant';


export const academicValidationSchema = z.object({
  name: z.enum([...semesterNames] as [string, ...string[]]),
  code: z.enum([...semesterCodes] as [string, ...string[]]),
  year: z.string(),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});

export const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterNames] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...semesterCodes] as [string, ...string[]]).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});