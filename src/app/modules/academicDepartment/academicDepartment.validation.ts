import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    name:z.string({
        invalid_type_error:"name is required"
    }),
    academicFaculty:z.string({
        invalid_type_error:"academic faculty is required"
    })
})
const updateAcademicDepartmentValidationSchema = z.object({
    name:z.string().optional(),
    academicFaculty:z.string().optional()
})


export const academicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema

}