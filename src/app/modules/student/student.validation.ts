import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional(),
});

export default studentValidationSchema;



// validation with joi
// import Joi from 'joi';

// export const programValidationSchema = Joi.object({
//   name: Joi.string().required(),
//   date: Joi.date().min('2000-01-01').max('2008-01-01').required(),
//   isWinner: Joi.boolean(),
// });

// export const previousJobsValidationSchema = Joi.object({
//   company: Joi.string().required(),
//   position: Joi.string().required(),
//   duration: Joi.string().required(),
//   salary: Joi.number(),
// });

// export const studentValidationSchema = Joi.object({
//   studentId: Joi.number().required(),
//   name: Joi.string().max(23).required(),
//   email: Joi.string().email().required(),
//   age: Joi.number().integer().min(18).max(40).required(),
//   enrolledCourse: Joi.array().items(Joi.string()).required(),
//   gender: Joi.string().valid('Male', 'Female').required(),
//   address: Joi.string().required(),
//   programs: programValidationSchema.required(),
//   skills: Joi.array().items(Joi.string().trim()).required(),
//   Payment: Joi.number().required(),
//   totalPayment: Joi.number().required(),
//   duePayment: Joi.number().required(),
//   previousJobs: Joi.array().items(previousJobsValidationSchema).required(),
//   isAdmin: Joi.boolean().required(),
//   isMarried: Joi.boolean(),
// });

// export default studentValidationSchema;
