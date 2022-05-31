import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { cognitoConfirmSignup } from '../../adapters/aws_cognito.adapters';
import ConfirmationCodeFields from '../../components/forms/confirmation_code_fields.components';
import { Link, useNavigate } from 'react-router-dom';


import SigninSignupPageTemplate from './signin_signup_page_template.hoc.component';
import PasswordField from '../../components/forms/password_field.components';
import TextField from '../../components/forms/text_field.components';
import SubmitBtn from '../../components/forms/submit_btn.components';

import './signup_confirmation_page.styles.scss';

const SignupConfirmationPage = (props: any) => {
  const navigate = useNavigate();
  // const { state }: {state: any} = useLocation();
  // const { navigationUsername } = state;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const  [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmationCode: ""
  })
  const [confirmationCodes, setConfirmationCodes] = useState({
    confirmationCode0: "",
    confirmationCode1: "",
    confirmationCode2: "",
    confirmationCode3: "",
    confirmationCode4: "",
    confirmationCode5: ""
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    let {username, password, confirmationCode} = formData;
    await cognitoConfirmSignup(username, password, confirmationCode)
      .then((response: any) => {
        let responseData = response.data;
        if(responseData && responseData.ResponseMetadata.HTTPStatusCode == 200) {
          navigate('/')
        }
      })
      .catch((err: any) => {
        setErrorMessage(err.response.data.message);
        window.scrollTo(0, 0)
        setTimeout(()=> {
            setErrorMessage("");
        }, 5000);
      });
    setIsLoading(false);
  }
  
  const onFormFieldChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const onConfirmationCodeFieldChange = (event: any) => {
    if (event.target.value.length > 1) {
      return;
    } else {
      setConfirmationCodes({
        ...confirmationCodes,
        [event.target.name]: event.target.value
      });

    }
  }

  useEffect(()=> {
    console.log("Rendering again with useEffect");

    if(formData.confirmationCode.length == 6) {
      setSubmitBtnDisabled(false);
    }
  },[formData])

  useEffect(() => {
    let combinedCodes = confirmationCodes.confirmationCode0 
                        + confirmationCodes.confirmationCode1
                        + confirmationCodes.confirmationCode2
                        + confirmationCodes.confirmationCode3
                        + confirmationCodes.confirmationCode4
                        + confirmationCodes.confirmationCode5
    setFormData({
      ...formData,
      confirmationCode: combinedCodes
    });

  },[confirmationCodes])

  return(
    <SigninSignupPageTemplate errorMessage={errorMessage}>
      <div className="form-container">
        <h3 className="form-title">Confirm My Account</h3>
        <form className="confirm-signup-form" onSubmit={handleSubmit} > 
          <TextField 
            fieldType="text" 
            fieldName="username" 
            value={formData.username}  
            label="username" 
            placeholder="" 
            onChangeHandler={onFormFieldChange}
          />

        <PasswordField
            fieldType="password" 
            fieldName="password" 
            value={formData.password} 
            label="password" 
            placeholder="" 
            onChangeHandler={onFormFieldChange}
          />
          <ConfirmationCodeFields codes={confirmationCodes} onChangeHandler={onConfirmationCodeFieldChange} />
          <SubmitBtn buttonType="submit" buttonName={isLoading ? "Confirming, please wait...": "Confirm"} disabled={submitBtnDisabled} />
        </form>
        <div className="links-container">
            <Link to="/">Ready to work? Sign in now</Link>
            <Link to="/signup">Don't have an account yet? Sign up now</Link>
        </div>

      </div>
    </SigninSignupPageTemplate>
  );
}
export default SignupConfirmationPage;