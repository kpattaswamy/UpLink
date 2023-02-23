import React, {FormEvent} from 'react';
import {render} from 'react-dom';
import { MyS3Auth } from './aws_s3_auth_conn';
  

// Stores the S3 keys from user input
interface AWS3Keys extends HTMLFormControlsCollection {
  accessKey: HTMLInputElement;
  secretAccessKey: HTMLInputElement;
  bucketName: HTMLInputElement;
}

// Make the param for onSubmit of type readonly 
interface AWSAuthForm extends HTMLFormElement {
  readonly elements: AWS3Keys;
}

// Type prop meant to be called with the identifier of the new state (UI) for App to render
type Props = {onViewChange? : (v : string)=>void};

export class GetS3Keys extends React.Component<Props>{

  constructor(props:Props){
    super(props);
  }

  //function to connect to s3
  onSubmit = (event: FormEvent<AWSAuthForm>) => {
      //Prevent Default so that the event can be recorded in console
      event.preventDefault();

      const target = event.currentTarget.elements;
      
      //User's keys for AWS S3
      const awsS3Keys = {
          accessKey: target.accessKey.value,
          secretAccessKey: target.secretAccessKey.value,
          bucketName: target.bucketName.value
      };

      // const s3Auth = new MyS3Auth(awsS3Keys.accessKey, awsS3Keys.secretAccessKey, awsS3Keys.bucketName);
      // This doesn't work complete, it only prints success or failure to console
      // const isValidUser = s3Auth.checkValidUser();

      let s3Auth = new MyS3Auth(awsS3Keys.accessKey, awsS3Keys.secretAccessKey);
      s3Auth.changeBucket(awsS3Keys.bucketName);
      const isValidUser = s3Auth.checkValidUser();
      console.log(isValidUser);

      // Following line should execute if a successful connection was made with S3, else change state to alert user of invalid keys
      // Change the UI to configure buckets after successful auth
      this.props.onViewChange!('config-bucket');
  };
  
  render () {
    return(
        <form className="form" onSubmit={this.onSubmit}>
            <div className="field">
                <label htmlFor="accessKey">AWS S3 Access key</label>
                <input 
                  type="text" 
                  id="accessKey" 
                />
            </div>
            <div className="field">
                <label htmlFor="secretAccessKey">AWS S3 Secret Access Key</label>
                <input 
                  type="text" 
                  id="secretAccessKey"
                />
            </div>
            <div className="field">
                <label htmlFor="bucketName">AWS S3 Bucket Name</label>
                <input
                  type="text"
                  id="bucketName"
                />
            </div>
            <button type="submit">Configure</button>
        </form>
    );
  }
};
