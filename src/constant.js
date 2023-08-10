export const BACKEND_URL = 'http://localhost:5010'
export const SECRET_CODE = 'THIS IS A SECRET DONT TRY TO COPY'

export const ErrorMessage = (error) => {
    return error.response && error.response?.data?.msg
        ? error.response.data.msg
        : error.message
}