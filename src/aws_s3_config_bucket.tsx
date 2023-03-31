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

export interface UpdateStateMeta {
    setViewState: (view: string) => void,
    view: string,
    setS3Obj: (s3Obj: UserS3) => void,
    s3Obj: UserS3
}

export class ConfigureBucket extends React.Component<Props>{

    constructor(props:Props){
        super(props);
    }

    // Callback to be provided to: class UserS3 function checkBucketAndChangeUI
    changeUIBucketStates = (stateMeta:UpdateStateMeta) : boolean => {
        if (stateMeta.view !== 'auth' && stateMeta.view !== 'config-bucket' && stateMeta.view !== 'file-transfer'){
            return false;
        }

        // s3Obj *could* be null when logged out or when retrieved from storage
        if (stateMeta.s3Obj === null){
            return false;
        }

        stateMeta.setS3Obj(stateMeta.s3Obj);
        stateMeta.setViewState(stateMeta.view);

        return true;
    }

    // Function to configure the bucket
    onSubmit = (event: FormEvent<BucketNameForm>) => {
        // Prevent Default so that the event can be recorded in console
        event.preventDefault();

        const target = event.currentTarget.elements;

        // User's selected bucket name
        const bucketName = target.bucketName.value;

        // Reuse the S3 object from App
        const s3 = this.props.existingS3Obj!;

        // Configure the bucket
        const resp = s3.changeBucket(bucketName);

        // Check the bucket only after it was changed in the object properly
        if (resp){
            const stateMeta : UpdateStateMeta = {
                setViewState: this.props.onViewChange!,
                view: 'file-transfer',
                setS3Obj: this.props.onS3ObjChange!,
                s3Obj: s3
            };
            s3.checkBucketAndChangeUI(stateMeta, this.changeUIBucketStates);

        } else {
            console.log("Empty bucket name given!");
            // Render HTML to let the user know that invalid bucket name was given
        }
    };

    render () {
        return(
            <form className="form" onSubmit={this.onSubmit}>
                <div id="bucketMessage">
                    <h1>Add your Bucket</h1>
                </div>
                <div className="field">
                    <div id="bucketLabel">
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
