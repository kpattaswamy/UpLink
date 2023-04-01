import React from 'react';

// Type prop meant to be called with the identifier of the new state (UI) for App to render
type Props = {
    onViewChange? : (s:string)=>void
};


export class WelcomeUser extends React.Component<Props>{

    constructor(props:Props){
        super(props);
    }

    // Change UI to auth on submit
    onSubmit = () => {
        this.props.onViewChange!('auth');
    };

    render () {
      return(
        <form className="form" onSubmit={this.onSubmit}>
            <div id="welcomeMessage">
                <h1>Welcome to UpLink!</h1>
            </div>

            <div>
                <h2 id="subHeader">What is UpLink?</h2>
                <ul id="upLinkDescription">
                    <li>
                        UpLink allows users to upload files from their browser to the cloud with a simple click
                    </li>
                    <li>
                        Files don't need to be downloaded to be sent to the cloud
                    </li>
                </ul>

                <h2 id="getStarted">Get started with UpLink</h2>
                <p id="getStartedMessage">
                    Select the cloud provider you'd like to send files to:
                </p>

                <div id="welcomeSubmit">
                    <button
                    id="welcomeSubmitButton"
                    type="submit" 
                    >
                    Configure with AWS S3
                    </button>
                </div>

                <p id="caveat">
                    Note: At this time UpLink can only send files to AWS S3      
                </p>
            </div>
        </form>
      );
    }
  };