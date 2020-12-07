import {useState, useEffect} from 'react'
import axios from 'axios'
import { PORT } from '../../CONSTANTS'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirm_password: ''
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
        async function SignUpUser() {
            axios
                .post(`${PORT}/createUserAuth`, submission)
                .then(function (response) {})
                {
                    // error handling (if username is taken)
                }
        }
        if (isSubmitting !== false)
          SignUpUser()
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

export default useForm