import Joi from 'joi';

const studentJoiValidateNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'string.max': 'First Name must not be more than {#limit} characters',
      'string.pattern.base': 'First Name must start with a capital letter',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string(),
  lastName: Joi.string().required().messages({
    'string.base': 'Last Name must be a string',
    'string.empty': 'Last Name is required',
    'any.required': 'Last Name is required',
  }),
});

const guardiantJoiValidateSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
    'any.required': 'Father Name is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'string.empty': 'Father Contact Number is required',
    'any.required': 'Father Contact Number is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
    'any.required': 'Father Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'string.empty': 'Mother Contact Number is required',
    'any.required': 'Mother Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
    'any.required': 'Mother Occupation is required',
  }),
});

const localGuardiantJoiValidateSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
    'any.required': 'Local Guardian Name is required',
  }),
  localGuardintcontactNumber: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'string.empty': 'Local Guardian Contact Number is required',
    'any.required': 'Local Guardian Contact Number is required',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Address must be a string',
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
});

const studentJoiValidateSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: studentJoiValidateNameSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female').messages({
    'any.only': '{#value} is not a valid gender',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  parmanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
    'any.required': 'Permanent Address is required',
  }),
  prasendAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
    'any.required': 'Present Address is required',
  }),
  guardiant: guardiantJoiValidateSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGuardiant: localGuardiantJoiValidateSchema.required().messages({
    'any.required': 'Local Guardian details are required',
  }),
  profileImg: Joi.string().required().messages({
    'string.base': 'Profile Image URL must be a string',
    'string.empty': 'Profile Image URL is required',
    'any.required': 'Profile Image URL is required',
  }),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
    .messages({
      'any.only': '{#value} is not a valid status',
    }),
});

export default studentJoiValidateSchema;
