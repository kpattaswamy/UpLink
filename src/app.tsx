import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';
import {ConfigureBucket} from './s3_config_bucket';


// Type Props specifies a function that will change the state of App
type Props = {onViewChange? : (s:string)=>void};

// Type ViewState specifies the state (auth, bucket configuration, file upload display, etc)
type ViewState = {
    view: string;
}

type accessKey = {
    key: string;
}

type secretAccessKey = {
    key: string;
}

// Driver for the UI
// App will serve as the root node for the "tree" of different UIs. It will always render the "state" that is set by any sub function  
export class App extends React.Component<Props, ViewState>{

    // Create the App, set props and default the state of App to render auth
    constructor(props:Props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state = {
            view: 'auth'
        };
    }

    // Function that will be passed as a prop to update the state
    handler(view:string) {
        this.setState({view})
    }
    
    render() {
        return (
        <div>
            {this.state.view === 'auth' 
            && 
            <GetS3Keys
                onViewChange={this.handler}
            />}
            
            {this.state.view === 'config-bucket' 
            && 
            <ConfigureBucket
                onViewChange={this.handler}
            
            />}
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));