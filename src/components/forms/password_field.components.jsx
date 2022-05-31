import './password_field.styles.scss';

const PasswordField = (props) => {
  const {label, fieldName, placeholder, value, onChangeHandler} = props;
  return (
    <div className="converter-form-group">
      <label className="field-label">{label}</label>
      <input className="field-input" value={value} type="password" name={fieldName} placeholder={placeholder}  onChange={onChangeHandler}/>
    </div>
  )
}

export default PasswordField;
