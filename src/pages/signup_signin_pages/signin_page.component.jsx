import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

import PasswordField from '../../components/forms/password_field.components';
import SigninSignupPageTemplate from './signin_signup_page_template.hoc.component';
import TextField from '../../components/forms/text_field.components';
import SubmitBtn from '../../components/forms/submit_btn.components';

import { constructUserFromCookies } from '../../utils/user_cookies.utils';

import signInSignUpFormImage from '../../assets/signin-signup-form-vector.png';

import './signin_page.styles.scss';

import { userSigin } from '../../adapters/flash_game_users.adapter';

const SigninPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [currentUser, setCurrentUser] = useState(() => constructUserFromCookies());
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onFormFieldChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })    
    }    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        let {username, password} = formData;
        await userSigin(username, password)
        .then((response)=>{
            let isSuccess = response.data.success;
            if (isSuccess) {
                let accessToken = response.data.data.access_token;
                let expiresInSeconds = response.data.data.expires_in;
                let expiresInDate = new Date(new Date().getTime() + expiresInSeconds * 1000);

                cookie.set("accessToken", accessToken, {expires: expiresInDate});
                cookie.set("username", username, {expires: expiresInDate});

                setCurrentUser(constructUserFromCookies());
                navigate('/dashboard')
            } else {
                alert("There were issues signing in");
            }
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
                <h3 className="form-title">Sign In</h3>
                <form onSubmit={handleSubmit} className="signin-form">
                    <TextField fieldType="text" label="username" fieldName="username" onChangeHandler={onFormFieldChange}/>
                    <PasswordField fieldType="password" label="password" fieldName="password" onChangeHandler={onFormFieldChange}/>
                    <SubmitBtn buttonType="submit" buttonName={isLoading ? "Signing In...": "Sign In"} />
                </form>
                <div className="links-container">
                    <Link to="/signup">First Time Playing? Join the Fun!</Link>
                </div>
                <img className='signin-signup-form-image' src={signInSignUpFormImage} />
            </div>
        </SigninSignupPageTemplate>
    );
}

export default SigninPage;