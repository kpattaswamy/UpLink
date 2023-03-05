import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';
import { MyS3Auth } from './aws_s3_auth_conn';
import {ViewStateStorage} from './storage/store_view_state';
import {UserMetaStorage} from './storage/store_user_metadata';
import {BucketConfigurator} from './aws_s3_config_bucket';

// Type Props specifies a function that will change the state of App
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:MyS3Auth)=>void
};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type State = {
    view: string;
    s3Obj: MyS3Auth | null;
}

// App will serve as the root node for the "tree" of different UIs. It will always render the "state" that is set by any sub function  
export class App extends React.Component<Props, State>{

    // Create the App, set props and default the state of App to render auth
    constructor(props:Props) {
        super(props);
        this.setViewState = this.setViewState.bind(this);
        this.setS3Obj = this.setS3Obj.bind(this);
        this.state = {
            view: 'auth',
            s3Obj: null
        };

        // "Reconstruct" the App object if necessary
        ViewStateStorage.getViewState(this.updateViewStatefromStorage);
        UserMetaStorage.getUserS3Obj(this.updateS3ObjFromStorage);
    }

    // Function that will be passed as a prop to update the state of the UI
    setViewState(view:string) {
        this.setState({view});
        // Update state in chrome storage 
        ViewStateStorage.putViewState(view);
    }

    // Function that will be passed as prop to globalize the S3 Object being made
    setS3Obj(s3Obj:MyS3Auth | null){

        this.setState({s3Obj});

        // Change the user metadata only if the s3 object is not null
        if (s3Obj){
            UserMetaStorage.putUserS3Obj(s3Obj!);
        }
    }

    // Changes the view state from what is in storage
    updateViewStatefromStorage = (view:string) => {
        if (view === 'auth' || view === 'config-bucket'){
            this.setViewState(view);
        } else {
            console.error("Trying to swtich to a UI view state that doesn't exist")
        }
    }

    // Updates the s3 object from what is in storage
    updateS3ObjFromStorage = (accessKeyId:string, secretAccessKey:string, region:string) => {

        // Access keys could be undefined if chrome storage returns undefined for a key that doesn't exist
        if (accessKeyId !== undefined && secretAccessKey !== undefined && region !== undefined){

            const s3Obj = new MyS3Auth(accessKeyId, secretAccessKey, region);
            this.setS3Obj(s3Obj); 
        }
    }

    // Logout function should move into configure bucket and send file classes. Contained in App for now
    logout = () => {
        
        const viewCallback = () => {
            this.setViewState('auth');
        }

        const userCallback = () => {
            this.setS3Obj(null);
        }

        ViewStateStorage.removeViewState(viewCallback);
        UserMetaStorage.removeUserMeta(userCallback);
    }

    render() {
        return (
        <div>
            {this.state.view === 'auth' 
            &&
            <GetS3Keys
                onViewChange={this.setViewState}
                onS3ObjChange = {this.setS3Obj}
            />}
            
            {this.state.view === 'config-bucket' 
            && 
            <div>
                <BucketConfigurator
                    onS3ObjChange={this.setS3Obj}
                    onViewChange={this.setViewState}
                    existingS3Obj={this.state.s3Obj!}
                />
                <button
                    type="button" 
                    value="Logout"
                    onClick={this.logout}
                >
                    Logout
                </button>
            </div>
            }

            {this.state.view === 'temp-window'
            &&
            <div>
                <h1>Temp Window</h1>
                <button
                    type="button" 
                    value="Logout"
                    onClick={this.logout}
                >
                    Reset for Testing
                </button>
            </div>
            }
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));