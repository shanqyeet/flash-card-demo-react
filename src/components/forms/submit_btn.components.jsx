import './submit_btn.styles.scss';

const SubmitBtn = (props) => {
  const {buttonType, buttonName, disabled} = props;
  return (
    <div className="submit-button-container">
      <button className="submit-button" type={buttonType} disabled={disabled}>{buttonName}</button>
    </div>
  )
}

export default SubmitBtn;