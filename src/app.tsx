import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';
import { UserS3 } from './aws_s3_connect';
import {ViewStateStorage} from './storage/store_view_state';
import {UserMetaStorage} from './storage/store_user_metadata';
import {BucketConfigurator} from './aws_s3_config_bucket';
import {FileTransfer} from './aws_s3_file_transfer';
import { URLStorage } from './storage/store_url_array';

// Type Props specifies a function that will change the state of App
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:UserS3)=>void,
    onURLArrayChange? : (a:Array<string>)=>void
};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type State = {
    view: string;
    s3Obj: UserS3 | null;
    urlArray: Array<string>;
}

// App will serve as the root node for the "tree" of different UIs. It will always render the "state" that is set by any sub function  
export class App extends React.Component<Props, State>{

    // Create the App, set props and default the state of App to render auth
    constructor(props:Props) {
        super(props);
        this.setViewState = this.setViewState.bind(this);
        this.setS3Obj = this.setS3Obj.bind(this);
        this.setURLArray = this.setURLArray.bind(this);
        this.state = {
            view: 'auth',
            s3Obj: null,
            urlArray: []
        };

        // "Reconstruct" the App object if necessary
        ViewStateStorage.getViewState(this.updateViewStatefromStorage);
        UserMetaStorage.getUserS3Obj(this.updateS3ObjFromStorage);
        URLStorage.getURLs(this.updateURLArrayfromStorage);
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

    // Function that will be passed as prop to update the URL Array
    setURLArray(urlArray:Array<string>) {
        if(urlArray != undefined)
        {
            this.setState({urlArray});
            for(var url of urlArray) {
                URLStorage.putURL(url);
            }
        }
        else {
            console.log("Invalid URL Array");
        }
    }

    // Changes the view state from what is in storage
    updateViewStatefromStorage = (view:string) => {
        if (view === 'auth' || view === 'config-bucket' || view === 'file-transfer'){
            this.setViewState(view);
        } else {
            console.error("Trying to swtich to a UI view state that doesn't exist")
        }
    }

    // Updates the s3 object from what is in storage
    updateS3ObjFromStorage = (accessKeyId:string, secretAccessKey:string, region:string, bucket:string) => {

        // Access keys could be undefined if chrome storage returns undefined for a key that doesn't exist
        if (accessKeyId !== undefined && secretAccessKey !== undefined && region !== undefined && bucket !== undefined){

            const s3Obj = new UserS3(accessKeyId, secretAccessKey, region);
            s3Obj.changeBucket(bucket);
            
            this.setS3Obj(s3Obj); 
        }
    }
    
    //Updates the URL Array from what it is in storage
    updateURLArrayfromStorage = (urlArray:Array<string>) => {
        if(urlArray != undefined) {
            this.setURLArray(urlArray);
        } else {
            console.log("URL Array is Invalid");
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

        const urlCallback = () => {
            this.setURLArray([]);
        }

        ViewStateStorage.removeViewState(viewCallback);
        UserMetaStorage.removeUserMeta(userCallback);
        URLStorage.clearURLs(urlCallback);
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
                <div id="logout">
                    <button
                        id="logoutButton"
                        type="button" 
                        value="Logout"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            }

            {this.state.view === 'file-transfer'
            &&
            <div>
                <FileTransfer
                    onS3ObjChange={this.setS3Obj}
                    onViewChange={this.setViewState}
                    existingS3Obj={this.state.s3Obj!}
                />                
                <div id="logout">
                    <button
                        id="logoutButton"
                        type="button" 
                        value="Logout"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            }
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));