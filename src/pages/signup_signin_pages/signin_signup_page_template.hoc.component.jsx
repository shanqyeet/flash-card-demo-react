import './signin_signup_page_template.styles.scss';
import backgroundImage from '../../assets/home_background.jpg';

const SigninSignupPageTemplate = ({children, errorMessage}) => {
  return (
    <div>
      <div className={"error-message-bar " + (errorMessage.length == 0 ? "error-message-bar-hide" : "")}>{errorMessage}</div>
      <div className="signin-page">
        <div className="left-container">
          <h1>Flash Card Game! </h1>
          <h3>Bring Fun To Your Mathetmatic Learnings</h3>
          <img className='signin-signup-background' src={backgroundImage} />
        </div>
        <div className="right-container">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SigninSignupPageTemplate;
        