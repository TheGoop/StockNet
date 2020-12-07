import {useState, useEffect} from 'react'
import axios from 'axios'
import { PORT } from '../../CONSTANTS'

const useLoginForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)
    }

    useEffect(() => {
        let submission = {
            username: values.username,
            password: values.password,
        }
        async function logInUser() {
            axios
                .post(`${PORT}/login`, submission)
                .then(function (response) {})
                {
                    // error handling (if username is taken)
                }
        }
        if (isSubmitting !== false)
            logInUser()
    },[isSubmitting])

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    },
    [errors]
    )

    return { handleChange, values, handleSubmit, errors };
}

export default useLoginForm