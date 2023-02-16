import React, {useState} from 'react';
import {render} from 'react-dom';
import {GetS3Keys} from './aws_s3_auth';

type ViewState = {
    view: string;
}
type Props = {onViewChange? : (s:string)=>void};
  
export class App extends React.Component<Props, ViewState>{
    constructor(props:Props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state = {
            view: 'auth'
        };
    }

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
            <div>State successfully changed to bucket configuration</div>}
        </div>
        )
    }
}

render(<App/>, document.getElementById("root"));