import {useState, useEffect} from 'react'
import axios from 'axios'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
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

    // useEffect(() => {
    //     async function makePost() {

    //         //NEED TO CHECK HERE IF YOU HAVE USERNAME, OTHERWISE SUBMIT AS ANONYMOUS WHERE EGGERT IS
    //         //THIS IS FOR POSTING COMMENTS
    //         //THIS IS ALL MENTIONS OF LOGGEDUSER AND EGGERT ON THIS PAGE

    //         let tempnewcomment = {
    //             user: "Eggert",
    //             content: commentInput,
    //             // upvotes: 0,
    //             // commentID: 'null'
    //         }

    //         axios
    //             .post(`${PORT}/comment?postID=${postID}`, tempnewcomment)
    //             .then(function (response) {
    //                 //console.log(response.data);
    //                 // console.log(response.data);
    //                 tempnewcomment.time = response.data.time
    //                 setClicked(null)

    //                 setInput('')
    //                 setComments([tempnewcomment, ...comments])
    //                 //makes it so page is dynamic, get back comment ID later
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }

    //     if (isSubmitting !== null) {
    //         makePost()
    //     }
    // }, [isSubmitting])

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