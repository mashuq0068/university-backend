import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().max(20).trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().max(20).trim(),
});

const facultyValidationSchema = z.object({
  id: z.string(),
  user: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  designation: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

export const facultyValidations =  { facultyValidationSchema };
