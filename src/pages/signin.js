import React, {useState} from 'react'
import FormLogin from '../components/Signin/FormLogin'
import LoginSuccess from '../components/Signin/LoginSuccess';
import '../components/Signin/FormLogin.css'
import SignUpImg from '../images/stock4.svg'

const SigninPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true)
    }
    return (
        <>
         <div className="form-container">
            <div className="form-content-left">
                <img src={SignUpImg} alt="login"
                className="form-img"/>
            </div>
            {!isSubmitted ? <FormLogin submitForm=
            {submitForm} /> : <LoginSuccess />}
        </div>
        </>
    )
}

export default SigninPage
