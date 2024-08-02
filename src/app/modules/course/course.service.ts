import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constaint';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';

// creating course
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// get all courses
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder<TCourse>(
    Course.find().populate({
      path: 'preRequisiteCourses',
      populate: {
        path: 'course',
      },
    }),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

// get single courses
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// delete single courses
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

// update a single course
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...basicFields } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedBasicFields = await Course.findByIdAndUpdate(
      id,
      { $set: basicFields },
      { new: true, runValidators: true, session },
    );
    if (!updatedBasicFields) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(400, 'basic field not found');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const removePreRequisiteCourses = preRequisiteCourses?.filter(
        (course) => course?.isDeleted === true,
      );

      const removePreRequisiteCourseIds = removePreRequisiteCourses?.map(
        (course) => course?.course,
      );

      const removeFromPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: removePreRequisiteCourseIds },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!removeFromPreRequisiteCourse) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(
          400,
          'process of removing PreRequisiteCourses did not work',
        );
      }

      const newPreRequisiteCourses = preRequisiteCourses?.filter(
        (course) => course?.isDeleted === false,
      );

      const addNewPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: newPreRequisiteCourses },
        },
        { new: true, runValidators: true, session },
      );
      if (!addNewPreRequisiteCourses) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(
          400,
          'process of adding PreRequisiteCourses did not work',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(400, err);
  }
};
const assignCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $set: {
        course: id,
      },
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const removeCourseFacultyFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignCourseFacultyIntoDB,
  removeCourseFacultyFromDB,
};
