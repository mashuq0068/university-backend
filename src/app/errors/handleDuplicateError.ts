/* eslint-disable @typescript-eslint/no-explicit-any */

const handleDuplicateError = (err:any) => {
 const statusCode = 400
 const message = "Duplicate error"
 const regex = /dup key: { (.*) }/;
 const match = err?.errorResponse?.errmsg?.match(regex)
 const errorSources  = [
    {
        path:'',
        message:`${match[1]} already existed`
    }
 ]
 return{
    statusCode,
    message,
    errorSources
 }
}
export default handleDuplicateError