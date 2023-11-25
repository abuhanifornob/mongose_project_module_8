import { Request } from 'express';

import { TStudent } from './student.interface';
import { Student } from './student.schema';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExits(studentData.id)) {
    throw new Error('Already exits this id');
  }
  // const student = new Student(studentData); // Create a instance
  // // .....Custom Insteance Method add.........
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('This user Id is Already exits');
  // }

  // const result = await student.save(); // Bild in instance Methods
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudntFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudntFromDB,
  deleteSingleStudentFromDB,
};
