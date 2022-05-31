import './signin_signup_page_template.styles.scss';
import backgroundImage from '../../assets/home_background.jpg';

const SigninSignupPageTemplate = ({children, errorMessage}) => {
  return (
    <div>
      <div className={"error-message-bar " + (errorMessage.length == 0 ? "error-message-bar-hide" : "")}>{errorMessage}</div>
      <div className="signin-page">
        <div className="left-container">
          <div className="title-container">
            <h1 className="main-title">Mathemtic Flash Card Game! </h1>
            <h3 className="sub-title">Bring Fun To Your Mathetmatic Learnings =)</h3>
          </div>
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
        