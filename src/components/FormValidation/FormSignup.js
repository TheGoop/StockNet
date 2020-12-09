import React from 'react'
import useForm from './useForm'
import validate from './ValidateInfo';
import './Form.css'

const FormSignup = ({submitForm}) => {
    const { handleChange, values, handleSubmit, errors } 
    = useForm(submitForm, validate);
    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1> Get started today! Create your account 
                    by filling out the information below.
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
                <div className='form-inputs'>
                    <label htmlFor='confirm_password'
                    className='form-label'>
                        Confirm password
                    </label>
                    <input
                        id='confirm_password'
                        type='password'
                        name='confirm_password'
                        className='form-input'
                        placeholder='Enter your password again'
                        value={values.confirm_password}
                        onChange={handleChange}
                        />
                        {errors.confirm_password && <p>{errors.confirm_password}</p>}
                </div>
                <button className="form-input-btn"
                type='submit'>
                    Sign up
                </button>
                <span className="form-input-login">
                    Already have an account? Login <a
                    href='/signin'>here</a>
                </span>
            </form>
        </div>

    )
}

export default FormSignup
