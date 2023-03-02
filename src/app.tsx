import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';
import { MyS3Auth } from './aws_s3_auth_conn';
import {ViewStateStorage} from './storage/handle_view_state';

// Type Props specifies a function that will change the state of App
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:MyS3Auth)=>void
};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type State = {
    view: string;
    s3Obj: MyS3Auth | {};
}

// Driver for the UI
// App will serve as the root node for the "tree" of different UIs. It will always render the "state" that is set by any sub function  
export class App extends React.Component<Props, State>{

    // Create the App, set props and default the state of App to render auth
    constructor(props:Props) {
        super(props);
        this.setViewState = this.setViewState.bind(this);
        this.setS3Obj = this.setS3Obj.bind(this)
        this.state = {
            view: 'auth',
            s3Obj: {}
        };

        // "Reconstruct" the App object if necessary
        ViewStateStorage.getViewState(this.changeViewStatefromStorage);
    }

    // Function that will be passed as a prop to update the state of the UI
    setViewState(view:string) {
        this.setState({view})
        // Update state in chrome storage 
        ViewStateStorage.putViewState(view);
    }

    // Function that will be passed as prop to globalize the S3 Object being made
    setS3Obj(s3Obj:MyS3Auth){
        this.setState({s3Obj})
    }

    // Changes the state from what is in storage
    changeViewStatefromStorage = (view:string) => {
        if (view === 'auth' || view === 'config-bucket'){
            this.setViewState(view);
        } else {
            console.error("Trying to swtich to a UI view state that doesn't exist")
        }
    }

    // Logout function should move into configure bucket and send file classes
    // Contained in App for now
    logout = () => {
        // Change state back to auth
        this.setViewState('auth');

        // Clear the chrome storage
        ViewStateStorage.clearViewState();
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