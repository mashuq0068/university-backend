import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constraint';

const createSemesterRegistrationValidationSchema = z.object({
  academicSemester: z.string(),
  status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number().optional(),
  maxCredit: z.number().optional(),
});

const updateSemesterRegistrationValidationSchema = z.object({
  academicSemester: z.string().optional(),
  status: z
    .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minCredit: z.number().optional(),
  maxCredit: z.number().optional(),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
