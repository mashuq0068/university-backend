import { ISemesterNamesWithCodes, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

export const months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const semesterNames: TAcademicSemesterName[] = [
    'Autumn',
    'Summer',
    'Fall',
  ];

  export const semesterNamesWithCodes: ISemesterNamesWithCodes = {
    Autumn:'01',
    Summer:'02',
    Fall:'03'
    
  }
  export const semesterCodes: TAcademicSemesterCode[] = ['01', '02', '03'];