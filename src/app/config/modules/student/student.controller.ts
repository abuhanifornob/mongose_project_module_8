import { Request, Response } from 'express';

import { z } from 'zod';

import studentJoiValidateSchema from './student.joiValidation';
import { Student } from './student.schema';
import { StudentServices } from './student.service';
import studentValidationData from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    // Joi Validation................
    // const { value, error } = studentJoiValidateSchema.validate(student);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something want worng',
    //     error,
    //   });
    // }

    // Zod Validation
    const zodSpreadData = studentValidationData.parse(student);

    const result = await StudentServices.createStudentIntoDB(zodSpreadData);
    res.status(200).json({
      success: true,
      message: 'A Student create is Successfylly',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something want worng',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All Studet Get a successfulu',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something want worng',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudntFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Get a single Student successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something want worng',
      error,
    });
  }
};
const deletedSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'A Student delete is successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something want worng',
      error,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deletedSingleStudent,
};
