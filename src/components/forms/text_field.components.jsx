import './text_field.styles.scss';

const TextField = (props) => {
  const {label, fieldName, placeholder, value, onChangeHandler} = props;
  return (
    <div className="converter-form-group">
      <label className="field-label">{label}</label>
      <input className="field-input" value={value} type="text" name={fieldName} placeholder={placeholder}  onChange={onChangeHandler}/>
    </div>
  )
}

export default TextField;
