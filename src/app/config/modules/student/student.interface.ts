import { Model } from 'mongoose';

import { TStudent } from './student.interface';

// 1. Create an interface representing a document in MongoDB.
export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardiant = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardiant = {
  name: string;
  localGuardintcontactNumber: string;
  email: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TStudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  prasendAddress: string;
  parmanentAddress: string;
  guardiant: TGuardiant;
  localGuardiant: TLocalGuardiant;
  profileImg?: string;
  isActive: 'active' | 'inActive';
  isDeleted: boolean;
};

// Create for Static Method

export interface StudentModel extends Model<TStudent> {
  isUserExits(id: string): Promise<TStudent | null>;
}

// Create a custom Instance Model

// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent|null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
