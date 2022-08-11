import {React, useState} from 'react';

const FormInputs = (props) => {
  const {label, onChange, ...rest} = props;
return (
  <div>
    <label>{label}</label>
    <input type="text"
    {...rest}
    onChange={onChange} />
  </div>
)
}

export default FormInputs;