import { FormButton, FormButtonLink } from './FormElements'
import React from 'react'
import SuccessImg from '../../images/stock5.svg'

const FormSuccess = () => {
    return (
        <div className="form-content-right">
            <div className="form-success">Creating your account was successful!</div>
                <FormButton>
                    <FormButtonLink to='/'>
                        Return home
                    </FormButtonLink>
                  </FormButton>
            <img src={SuccessImg} alt='success'
            className='form-img-2' />
        </div>
    )
}

export default FormSuccess
