import React from 'react';

import './signin_form.styles.scss';

const SigninForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit} >
    <input type="email" />
    <input type="password" />
    <input type="submit" value="Submit"/>
  </form>
);

export default SigninForm;

