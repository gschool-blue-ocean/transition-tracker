import {React, useState} from 'react';
import '../../StyleSheets/Settings.css'

const FormInputs = (props) => {
  const {label, onChange, ...rest} = props;
return (
  <div className='adminFormInputs--container'>
    <label>{label}</label>
    <input type="text"
    {...rest}
    onChange={onChange} />
  </div>
)
}

export default FormInputs;