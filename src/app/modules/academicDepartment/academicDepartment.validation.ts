import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name is required',
  }),
  academicFaculty: z.string({
    invalid_type_error: 'academic faculty must be a string',
    required_error: 'academic faculty is required',
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
    })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: 'academic faculty must be a string',
    })
    .optional(),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
