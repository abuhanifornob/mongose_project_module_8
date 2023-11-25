import { z } from 'zod';

const studentNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First Name must start with a capital letter and only contain letters',
    })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  middleName: z.string(),
  lastName: z.string(),
});

const guardiantSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
});

const localGuardiantSchema = z.object({
  name: z.string(),
  localGuardintcontactNumber: z.string(),
  email: z.string().email('Invalid email format'),
  address: z.string(),
});

const studentValidationData = z.object({
  id: z.string(),
  password: z.string().max(20).min(5),
  name: studentNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  email: z.string().email('Invalid email format'),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
  parmanentAddress: z.string(),
  prasendAddress: z.string(),
  guardiant: guardiantSchema,
  localGuardiant: localGuardiantSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'inActive']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationData;
