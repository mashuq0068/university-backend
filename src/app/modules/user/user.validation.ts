import { object, z } from 'zod';

export const userValidationSchema = object({
  password: z
    .string({
      invalid_type_error: 'the password must be a string',
    })
    .max(20, { message: 'password must be in 20 characters' })
    .optional(),
});

