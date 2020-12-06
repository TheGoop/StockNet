import React from 'react'
import { Container, Form, FormButton, FormButtonLink, FormContent, FormH1, FormInput, FormLabel, 
    FormWrap, Icon } from './SigninElements'

export const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to='/'>StockNet</Icon>
                    <FormContent>
                        <Form action='#'>
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required />
                            <FormButton>
                                <FormButtonLink to='/'>
                                Continue
                                </FormButtonLink>
                            </FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn