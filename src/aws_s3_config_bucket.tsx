import React, {FormEvent} from 'react';
import { UserS3 } from './aws_s3_connect';


// Stores the Bucket name from user input
interface BucketName extends HTMLFormControlsCollection {
    bucketName: HTMLInputElement;
}


// Make the param for onSubmit of type readonly
interface BucketNameForm extends HTMLFormElement {
    readonly elements: BucketName;
}

// Type prop meant to be called with the identifier of the new state (UI) for App to render
type Props = {
  onViewChange? : (s:string)=>void,
  onS3ObjChange? : (o:UserS3)=>void,
  existingS3Obj?: UserS3
};

export class BucketConfigurator extends React.Component<Props>{

    constructor(props:Props){
        super(props);
    }

    // Function to configure the bucket
    onSubmit = (event: FormEvent<BucketNameForm>) => {
        // Prevent Default so that the event can be recorded in console
        event.preventDefault();

        const target = event.currentTarget.elements;

        // User's selected bucket name
        const bucketName = target.bucketName.value;

        // Reuse the S3 object from App
        const s3Auth = this.props.existingS3Obj!;

        // Configure the bucket
        s3Auth.changeBucket(bucketName);
        s3Auth.checkBucketAndChangeUI(this.props.onViewChange!, 'file-transfer', this.props.onS3ObjChange!, s3Auth);
    };

    render () {
        return(
            <form className="form" onSubmit={this.onSubmit}>
                <div id="bucketMessage">
                    <h1>Add your Bucket</h1>
                </div>
                <div className="field">
                    <div id="buckets">
                        <label htmlFor="bucketName">Enter your bucket's name for file transfer:</label>
                    </div>

                    <input
                        type="text"
                        id="bucketName"
                    />
                </div>
                <div id="bucketSubmit">
                    <button type="submit">Configure</button>
                </div>
            </form>
        )
    }
}
