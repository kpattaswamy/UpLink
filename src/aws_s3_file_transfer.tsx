import React, {FormEvent} from 'react';
import { UserS3 } from './aws_s3_connect';

interface FileURL extends HTMLFormControlsCollection {
    fileURL: HTMLInputElement;
}

interface FileURLForm extends HTMLFormElement {
    readonly elements: FileURL;
}

// Props that will be derived from  App class
type Props = {
  onViewChange? : (s:string)=>void,
  onS3ObjChange? : (o:UserS3)=>void,
  existingS3Obj? : UserS3
  onAddURL? : (u:string)=>void
  existingURLArray? : Array<string>
};

// Store all data relavent to a row for the table (URL,success status, trash)
interface RowData {
    data: string;
}

// State to store all the rows
interface TableState {
    tableRows: RowData[];
}

export class FileTransfer extends React.Component<Props, TableState>{

    constructor(props:Props){
        super(props);
        this.addRow = this.addRow.bind(this);
        this.state = {
            tableRows: [],
        };

        // Reconstruct state and the table on UI if there was a URL array in storage
        const existingURLArray = this.props.existingURLArray;

        if(existingURLArray!.length > 0) {
            for (let url in existingURLArray){
                const row : RowData = {data:url}
                this.addRow(row);
                this.updateTable(row);
            }
        } 
    }

    // Adds the new row's data to state
    addRow = (newRow:RowData) => {
      this.setState({
          tableRows: [...this.state.tableRows, {data: newRow.data}]
        });
    };

    onSubmit = (event: FormEvent<FileURLForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        // URL for the file inputted
        const fileURL = target.fileURL.value;

        // Add URL to state and storage
        this.props.onAddURL!(fileURL);

        // This will need to be expanded to support URL validation (success column)
        const row: RowData = {data:fileURL}
        
        const s3Client = this.props.existingS3Obj!;

        // Necessary to avoid duplicate file names being sent to bucket. 
        // This will need to be changed for robustness when naming files
        let dateTime = new Date()

        s3Client.uploadFile(fileURL, s3Client.whichBucket, dateTime.toString());

        // Show the user whether a succesful transfer happened and log it in state
        this.addRow(row);
        this.updateTable(row);
    };

    // Updates the table on UI to show the user the new file trying to be sent
    updateTable = (newRowData:RowData) => {
        const tbodyRef = document.getElementById('filesSentTable')!.getElementsByTagName('tbody')[0];

        // Insert row at the end of table
        const newRow = tbodyRef.insertRow();

        // Insert cell at the end of the row
        const urlCell = newRow.insertCell();
        const statusCell = newRow.insertCell();

        // Append text node to the cell
        const urlString = document.createTextNode(newRowData.data);
        urlCell.appendChild(urlString);

        // Will change in a later PR to reflect true status
        const unknown = document.createTextNode("unknown");
        statusCell.appendChild(unknown);
    }


    render () {
        return(
            <div>
                <div id="sendFilesHeader">
                    <h1>Upload Files</h1>
                </div>

                <form className="form" id="urlInput" onSubmit={this.onSubmit}>
                    <div id="inputSubmitWrapper">
                        <div className="field" id="fileURLInput">
                            <div id="fileLabel">
                                <label htmlFor="fileURL">Enter the file URL to upload to your S3 Bucket:</label>
                            </div>

                            <input
                                type="text"
                                id="fileURL"
                            />
                        </div>

                        <div id="fileSubmit">
                            <button 
                            type="submit"
                            id="fileSubmitButton">
                            Upload
                            </button>
                        </div>
                    </div>

                    <div id="filesSentTable">
                        <table id="table">
                            <thead>
                                    <th id="tableHeader">File URL</th>
                                    <th id="tableHeader">Status</th>
                            </thead>
                            <tbody id="body"></tbody>
                        </table>
                    </div>
                </form>
            </div>
        )
    }
}
