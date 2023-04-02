import React, {FormEvent} from 'react';
import { UserS3 } from './aws_s3_connect';
  

// Stores the S3 keys from user input
interface AWS3Keys extends HTMLFormControlsCollection {
  accessKey: HTMLInputElement;
  secretAccessKey: HTMLInputElement;
}

// Make the param for onSubmit of type readonly 
interface AWSAuthForm extends HTMLFormElement {
  readonly elements: AWS3Keys;
}

// Type prop meant to be called with the identifier of the new state (UI) for App to render
type Props = {
  onViewChange? : (s:string)=>void,
  onS3ObjChange? : (o:UserS3)=>void
};

export class AuthS3 extends React.Component<Props>{

  constructor(props:Props){
    super(props);
  }

  // Function to connect to s3
  onSubmit = (event: FormEvent<AWSAuthForm>) => {
      // Prevent Default so that the event can be recorded in console
      event.preventDefault();

      const target = event.currentTarget.elements;
      
      // User's keys for AWS S3
      const awsS3Keys = {
          accessKey: target.accessKey.value,
          secretAccessKey: target.secretAccessKey.value,
      };

      // Create a new S3Auth object with the user's keys
      const s3Auth = new UserS3(awsS3Keys.accessKey, awsS3Keys.secretAccessKey);

      // Following function call will validate the user and only after validation will the S3 object be stored in app
      s3Auth.checkAndDisplayValidUser(this.props.onViewChange!, 'config-bucket', this.props.onS3ObjChange!, s3Auth);
  };
  
  render () {
    return(
        <form className="form" onSubmit={this.onSubmit}>
            <div id="authMessage">
                <h1>Configure your AWS S3 Account</h1>
            </div>
            <div className="field">
                <div id="keyLabels">
                  <label htmlFor="accessKey">Enter your AWS S3 Access Key:</label>
                </div>

                <input 
                  type="text" 
                  id="accessKey" 
                />
            </div>
            <div className="field">
                <div id="keyLabels">
                    <label htmlFor="secretAccessKey">Enter your AWS S3 Secret Access Key:</label>
                </div>

                <input 
                  type="password" 
                  id="secretAccessKey"
                />
            </div>
            <div id="authSubmit">
                <button
                  id="authSubmitButton"
                  type="submit" 
                  value="Authenticate"
                >
                Authenticate
                </button>
            </div>
        </form>
    );
  }
};
