import React, {useState} from 'react'
import FormSignup from '../components/FormValidation/FormSignup'
import FormSuccess from '../components/FormValidation/FormSuccess'
import '../components/FormValidation/Form.css'
import SignUpImg from '../images/stock4.svg'

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true)
    }
    return (
        <>
         <div className="form-container">
            <span className="close-btn">x</span>
            <div className="form-content-left">
                <img src={SignUpImg} alt="login"
                className="form-img"/>
            </div>
            {!isSubmitted ? <FormSignup submitForm=
            {submitForm} /> : <FormSuccess />}
        </div>
        </>
    )
}

export default Form