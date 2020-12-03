export default function validateInfo(values) {
    let errors = {}

    if (!values.username.trim()) {
        errors.username = "Username required"
    }

    if (!values.email) {
        errors.email = "Email required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid"
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters long or more'
    }

    if (!values.confirm_password) {
        errors.confirm_password = 'Password is required'
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = 'Password does not match'
    }

    return errors
}