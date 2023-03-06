import React, {FormEvent} from 'react';
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
type Props = {
  onViewChange? : (s:string)=>void,
  onS3ObjChange? : (o:MyS3Auth)=>void
};

export class GetS3Keys extends React.Component<Props>{

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
          bucketName: target.bucketName.value
      };

      // Create a new S3Auth object with the user's keys
      const s3Auth = new MyS3Auth(awsS3Keys.accessKey, awsS3Keys.secretAccessKey);

      // Following function call will validate the user and only after validation will the S3 object be stored in app
      s3Auth.checkAndDisplayValidUser(this.props.onViewChange!, 'config-bucket', this.props.onS3ObjChange!, s3Auth);
      
  };
  
  render () {
    return(
        <form className="form" onSubmit={this.onSubmit}>
            <div id="welcomeMessage">
                <h1>Welcome to UpLink!</h1>
            </div>
            <div className="field">
                <div id="keyLabels">
                  <label htmlFor="accessKey">AWS S3 Access Key</label>
                </div>

                <input 
                  type="text" 
                  id="accessKey" 
                />
            </div>
            <div className="field">
                <div id="keyLabels">
                    <label htmlFor="secretAccessKey">AWS S3 Secret Access Key</label>
                </div>

                <input 
                  type="password" 
                  id="secretAccessKey"
                />
            </div>
            <div className="field">
                <div id="keyLabels">
                  <label htmlFor="bucketName">AWS S3 Bucket Name</label>
                </div>

                <input
                  type="text"
                  id="bucketName"
                />
            </div>
            <div id="authSubmit">
                <button
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
