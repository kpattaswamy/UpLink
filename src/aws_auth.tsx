import React, {FormEvent} from 'react';
import {render} from 'react-dom';

import * as AWS from 'aws-sdk';

export class AuthAWS {
	username: string
	password: string
  objectAWS: AWS

	constructor (_user: string, _pass: string){
		this.username = _user
		this.password = _pass
	}

  sdk_configure () {
    this.objectAWS = new AWS.config.update({
      region: 'us-east-1',

    })
  }
}

/*
var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
var myConfig = new AWS.Config({
  credentials: myCredentials, region: 'us-west-2'
});

myConfig.update({region: 'us-east-1'})

// Below is ChatGPT solution

// Configure the AWS SDK
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key'
});

// Create a new instance of the AWS.CognitoIdentityServiceProvider service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

// Define the login credentials
const loginCredentials = {
  UserName: 'user1',
  Password: 'password1'
};

// Call the adminInitiateAuth method to log in
cognitoIdentityServiceProvider.adminInitiateAuth({
  AuthFlow: 'ADMIN_NO_SRP_AUTH',
  UserPoolId: 'your-user-pool-id',
  ClientId: 'your-app-client-id',
  AuthParameters: loginCredentials
}, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
*/