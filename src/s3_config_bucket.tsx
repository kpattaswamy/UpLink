import React from 'react';
import Select from "react-select";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.




// Type prop meant to be called with the identifier of the new state (UI) for App to render
type Props = {onViewChange? : (v : string)=>void};

export class ConfigureBucket extends React.Component<Props>{

  constructor(props:Props){
    super(props);
  }
  
  run = async () => {
    try {
      const data = await s3Client.send(new ListBucketsCommand({}));
      console.log("Success", data.Buckets);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };

  // Retrieve all of the user's S3 buckets 
  getAllS3Buckets = (accessKey:string, secretAccessKey:string) => {
      // Asssert valid keys
      if (accessKey.length === 0 || secretAccessKey.length === 0){
          // Throw an error OR
          // Invalid keys, reroute to auth
          this.props.onViewChange!('auth');
      }
      const buckets = this.run();

      // Return an array of buckets in S3
      return buckets;

  };

  // Remember the user's bucket choice for file routing
  setS3BucketDest = () => {

  }

  render () {
    return(
        <Select 
            options={this.getAllS3Buckets(TESTING_ACCESS_KEY, TESTING_SECRET_KEY)}
            onChange={this.setS3BucketDest}
        />
    )
  }
};
