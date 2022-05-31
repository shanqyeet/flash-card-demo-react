import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import PasswordField from '../../components/forms/password_field.components';
import TextField from '../../components/forms/text_field.components';
import SubmitBtn from '../../components/forms/submit_btn.components';

import './signup_page.styles.scss';
import SigninSignupPageTemplate from './signin_signup_page_template.hoc.component';
import { userSignup } from '../../adapters/flash_game_users.adapter';

const SignupPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  const navigate = useNavigate();
  const onFormFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let {username, email, password, confirmPassword} = formData;
    await userSignup(username, password, confirmPassword)
      .then((response) => {
        let responseData = response.data;
        // if(!responseData.UserConfirmed && responseData.CodeDeliveryDetails) {
        //   navigate(
        //     '/confirm_signup',
        //     {state: {username: username}}
        //   )
        // }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        window.scrollTo(0, 0)
        setTimeout(()=> {
            setErrorMessage("");
        }, 5000);
      });
    
      setIsLoading(false);
  }

  return(
      <SigninSignupPageTemplate errorMessage={errorMessage}>
      <div className="form-container">
        <h3 className="form-title">Sign Up</h3>
        <form className="signup-form" onSubmit={handleSubmit} > 
          <TextField 
            fieldName="username" 
            value={formData.username}  
            label="username" 
            placeholder="" 
            onChangeHandler={onFormFieldChange}
          />
          <PasswordField
            fieldName="password" 
            value={formData.password} 
            label="password" 
            placeholder="" 
            onChangeHandler={onFormFieldChange}
          />
          <PasswordField 
            fieldName="confirmPassword" 
            value={formData.confirmPassword} 
            label="confirm password" 
            placeholder="" 
            onChangeHandler={onFormFieldChange} 
          />
          <SubmitBtn buttonType="submit" buttonName={isLoading ? "Signing Up...": "Sign Up"} />
        </form>
        <div className="links-container">
            <Link to="/">Ready to Learn? Start Now!</Link>
        </div>

      </div>
    </SigninSignupPageTemplate>
  )
}
export default SignupPage;