import { FormButton, FormButtonLink } from '../FormValidation/FormElements'
import React from 'react'

const FormSuccess = () => {
    return (
        <div className="form-content-right">
            <div className="form-success">Logging into your account was successful!</div>
                <FormButton>
                    <FormButtonLink to='/'>
                        Return home
                    </FormButtonLink>
                  </FormButton>
        </div>
    )
}

export default FormSuccess
