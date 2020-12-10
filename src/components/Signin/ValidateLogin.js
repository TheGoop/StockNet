export default function validateInfo(values, status) {
    let errors = {}

    if (!values.username.trim()) {
        errors.username = "Username required"
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 4) {
        errors.password = 'Password needs to be 4 characters long or more'
    }
    if (status == 404){
        errors.username = 'No authentication data found for user'
    }        
    if (status == 401){
        errors.password = 'Incorrect password'
    }


    return errors
}