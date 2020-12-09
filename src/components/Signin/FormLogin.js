import React from 'react'
import useLoginForm from './useLoginForm'
import validate from './ValidateLogin';
import './FormLogin.css'

const FormLogin = ({submitForm}) => {
    const { handleChange, values, handleSubmit, errors } 
    = useLoginForm(submitForm, validate);
    return (
        <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit}>
            <h1> Sign into your account.
            </h1>
            <div className='form-inputs'>
                <label htmlFor='username'
                className='form-label'>
                    Username
                </label>
                <input
                    id='username'
                    type='text'
                    name='username'
                    className='form-input'
                    placeholder='Enter your username'
                    value={values.username}
                    onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
            </div>
            <div className='form-inputs'>
                <label htmlFor='password'
                className='form-label'>
                    Password
                </label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    className='form-input'
                    placeholder='Enter your password'
                    value={values.password}
                    onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
            </div>
            <button className="form-input-btn"
            type='submit'>
                Log in
            </button>
        </form>
    </div>

    )
}

export default FormLogin