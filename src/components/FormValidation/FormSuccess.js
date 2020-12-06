import { FormButton, FormButtonLink } from './FormElements'
import React from 'react'

const FormSuccess = () => {
    return (
        <div className="form-content-right">
            <div className="form-success">Creating your account was successful!</div>
            <img src='../../images/stock4.png' alt='success'
            className='form-img-2' />
                <FormButton>
                    <FormButtonLink to='/'>
                        Return home
                    </FormButtonLink>
                  </FormButton>
        </div>
    )
}

export default FormSuccess
