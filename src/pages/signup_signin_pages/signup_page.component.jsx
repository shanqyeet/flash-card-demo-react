import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import PasswordField from '../../components/forms/password_field.components';
import TextField from '../../components/forms/text_field.components';
import SubmitBtn from '../../components/forms/submit_btn.components';

import './signup_page.styles.scss';
import SigninSignupPageTemplate from './signin_signup_page_template.hoc.component';
import { userSignup } from '../../adapters/flash_game_users.adapter';
import { renderAvatar } from '../../adapters/boring_avatar_adapter';


const SignupPage = (props) => {
  let API_URL = "https://source.boringavatars.com/beam"; 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarElement, setAvatarElement] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword:"",
    avatarUrl:""
  });


  useEffect(() => {
    let {username} = formData;
    getAvatarOrDefault(username);
  }, [formData])

  const navigate = useNavigate();
  const onFormFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const getAvatarOrDefault = (username) => {
    renderAvatar(username).then(resp => {
      if(resp.data != null) {
        setAvatarElement(resp.data);
      } else {
        setAvatarElement("default");
      }
    }) 

  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let {username, password, confirmPassword} = formData;
    let avatarUrl = API_URL + "/160/" + username;

    await userSignup(username, password, confirmPassword, avatarUrl)
      .then((response) => {
        let responseData = response.data;
        console.log(responseData);
        if(responseData) {
          navigate('/')
          alert("Hooooray! successful created your user record. Start game with your new username: " + responseData.username);
        } else {
          alert("There seems to be some problem signing up, can you try again? pretty please...")
        }
      })
      .catch((err) => {
        // setErrorMessage(err.response.data.message);
        setErrorMessage("Hello there... It seems your username or passwords were invalid. Can you try again?")
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
        <div>
          <div dangerouslySetInnerHTML={{__html: avatarElement}} />
        </div>
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