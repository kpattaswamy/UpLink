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

        // This will need to be expanded to support URL validation (success column)
        const row: RowData = {data:fileURL}
        
        // Following should execute after URL validation
        // Send file to S3

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
        const newCell = newRow.insertCell();

        // Append text node to the cell
        const urlString = document.createTextNode(newRowData.data);
        newCell.appendChild(urlString);
    }


    render () {
        return(
            <div>
                <div id="sendFilesHeader">
                    <h1>Send Files</h1>
                </div>

                <form className="form" onSubmit={this.onSubmit}>
                    <div id="filesSentTable">
                        <table id="table">
                            <thead>
                                    <th>File URL</th>
                                    <th>Status</th>
                            </thead>
                            <tbody id="tab"></tbody>
                        </table>
                    </div>

                    <div className="field">
                        <div id="fileLabel">
                            <label htmlFor="fileURL">Enter file URL to send it to your S3 bucket:</label>
                        </div>

                        <input
                            type="text"
                            id="fileURL"
                        />
                    </div>

                    <div id="fileSubmit">
                        <button type="submit">Send File</button>
                    </div>
                </form>
            </div>
        )
    }
}
