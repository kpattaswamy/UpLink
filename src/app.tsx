import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';
import { UserS3 } from './aws_s3_connect';
import {ViewStateStorage} from './storage/store_view_state';
import {UserMetaStorage} from './storage/store_user_metadata';

// Type Props specifies a function that will change the state of App
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:UserS3)=>void
};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type State = {
    view: string;
    s3Obj: UserS3 | null;
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
    setS3Obj(s3Obj:UserS3 | null){

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

            const s3Obj = new UserS3(accessKeyId, secretAccessKey, region);
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
                Configure the bucket
                <div id="logout">
                    <button
                        type="button" 
                        value="Logout"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>}
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));