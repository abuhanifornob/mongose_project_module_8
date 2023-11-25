import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

import {
  StudentMethods,
  StudentModel,
  TGuardiant,
  TLocalGuardiant,
  TStudent,
  TStudentName,
} from './student.interface';

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'not Allower more then 20 Letterar'],
    validate: {
      validator: (value: string) => {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        return firstName === value;
      },
      message: '{VALUE} is not Accepeteble Please Type Capitalize value',
    },
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

const guardiantSchema = new Schema<TGuardiant>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
});

const localGuardiantSchema = new Schema<TLocalGuardiant>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  localGuardintcontactNumber: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  email: { type: String, required: [true, 'Email is required'] },
  address: { type: String, required: [true, 'Address is required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    password: {
      type: String,
      required: [true, 'password is required'],

      min: [5, 'Password Minimum 5 charecter'],
      max: [20, "Password don't over the 20 Charecter"],
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid',
      },
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
      },
    },
    parmanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    prasendAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    guardiant: {
      type: guardiantSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardiant: {
      type: localGuardiantSchema,
      required: [true, 'Local Guardian details are required'],
    },
    profileImg: {
      type: String,
      required: [true, 'Profile Image URL is required'],
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'inActive'],
        default: 'active',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual Setup

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware/ hook : will work on create()  save()
// Document Middleware..........
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // const user.password = bcrypt.hashSync(user.password, 12);
  const hash = await bcrypt.hash(user.password, 12);
  user.password = hash;
  next();
});
// Post Save Middlwere
studentSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

// Quary Middlwere....

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// aggregate Middlweare
// [{$match:{isDeleted:{$ne:true}}} { '$match': { id: '12368' } } ]
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for Static Method
studentSchema.statics.isUserExits = async function (id: string) {
  const userExits = await Student.findOne({ id });
  return userExits;
};

export const Student = model<TStudent, StudentModel>(
  'studentInfo',
  studentSchema,
);

// Create a Custom Instande Mode Methods
// studentNameSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// export const Student = model<TStudent, StudentModel>(
//   'studentInfo',
//   studentSchema,
// );
