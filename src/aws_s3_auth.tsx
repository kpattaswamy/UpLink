import React, {FormEvent, PureComponent, useState} from 'react';
//import {App} from './app';

interface AWS3Keys extends HTMLFormControlsCollection {
  accessKey: HTMLInputElement;
  secretAccessKey: HTMLInputElement;
}

interface AWSAuthForm extends HTMLFormElement {
  readonly elements: AWS3Keys;
}
type Props = {onViewChange? :(s:string)=>void};

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
      };
      
      this.props.onViewChange!('config-bucket');

      console.log(awsS3Keys);
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
            <button type="submit">Configure</button>
        </form>
    );

    



  }
};

