import React, {FormEvent} from 'react';
import {render} from 'react-dom';
import { S3Upload } from './aws_s3_upload';
// import AWS_cloud from './aws_authentication';
// import { AuthAWS } from './aws_auth';

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
      let s3Uploader = new S3Upload("asdf", "123", "testingseniordesign")
      let res = s3Uploader.checkValidUser().then((res) => {
        if (res) {
          console.log("success")
          return true
        } else {
          console.log("failure")
          return false
        }}
      )
      console.log("1 " + res)
      
      let s3Uploader2 = new S3Upload("", "", "testingseniordesign")
      let res2 = s3Uploader2.checkValidUser()
      console.log("2 " + res2)
      
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
