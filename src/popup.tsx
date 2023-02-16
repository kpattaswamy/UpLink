import React, {FormEvent} from 'react';
import {render} from 'react-dom';
  
interface AWS3Keys extends HTMLFormControlsCollection {
  accessKey: HTMLInputElement;
  secretAccessKey: HTMLInputElement;
}

interface AWSAuthForm extends HTMLFormElement {
  readonly elements: AWS3Keys;
}

export const AWSS3Auth = () => {
  const onSubmit = (event: FormEvent<AWSAuthForm>) => {
      //Prevent Default so that the event can be recorded in console
      event.preventDefault();

      const target = event.currentTarget.elements;

      //User's keys for AWS S3
      const awsS3Keys = {
          accessKey: target.accessKey.value,
          secretAccessKey: target.secretAccessKey.value,
      };

      console.log(awsS3Keys);
  };

  return (
      <form className="form" onSubmit={onSubmit}>
          <div className="field">
              <label htmlFor="accessKey">AWS S3 Access key</label>
              <input type="text" id="accessKey" />
          </div>
          <div className="field">
              <label htmlFor="secretAccessKey">AWS S3 Secret Access Key</label>
              <input type="text" id="secretAccessKey" />
          </div>
          <button type="submit">Configure</button>
      </form>
  );
};

render(<AWSS3Auth/>, document.getElementById("awsS3Auth"));
