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
    const [user, setUser] = useState();
    
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
        // console.log(submission)
        async function logInUser() {
            axios.post(`${PORT}/login`, submission)
            .then((response) => {
            setUser(submission.username);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(submission.username));
            })
            .catch(function(error){
                console.log(error);
            })
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