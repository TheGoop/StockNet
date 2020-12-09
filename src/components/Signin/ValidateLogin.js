export default function validateInfo(values) {
    let errors = {}

    if (!values.username.trim()) {
        errors.username = "Username required"
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 4) {
        errors.password = 'Password needs to be 4 characters long or more'
    }

    return errors
}