import React, {FormEvent} from 'react';
import {render} from 'react-dom';
// import AWS_cloud from './aws_authentication';
import { AuthAWS } from './aws_auth';

interface CustomElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}


export const Popup = () => {
  const onSubmit = (event: FormEvent<CustomForm>) => {
      console.log(event);

      event.preventDefault();

      const target = event.currentTarget.elements;

      const data = {
          email: target.username.value,
          password: target.password.value,
      };

      // console.log(data);
      const authenAWS = new AuthAWS(data.email, data.password)
      authenAWS.print_parameter()
      authenAWS.sdk_configure()
      
  };

  return (
      <form className="form" onSubmit={onSubmit}>
          <div className="field">
              <label htmlFor="username">AWS User Name</label>
              <input type="email" id="username" />
          </div>
          <div className="field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
          </div>
          <button type="submit">Login</button>
      </form>
  );
};

render(<Popup />, document.getElementById("popup"));
