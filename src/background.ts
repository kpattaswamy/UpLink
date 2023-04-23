import React from "react";
import { URLStorage } from "./storage/store_url_array";
import { UserS3 } from './aws_s3_connect';
import { UserMetaStorage } from "./storage/store_user_metadata";


//Creates a Context Menu right click option for saving pdf links
chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        //identifier for right contextmenu item
        id: "right-click-option",
        //message for the option
        title: "Send with Uplink",
        //only applies to links
        contexts:["link"],
        //initially set to false, but is updated depending on the view state
        enabled:false,
    });
});

//Listener for right click, validates string as URL then sends to S3
chrome.contextMenus.onClicked.addListener(function(info){
    let link:string = info.linkUrl as string;

    if(validateURL(link)){
        sendFileWrapper(link);
    }
});

const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

//Async functions to allow for subsequent calls
async function putURLWrapper(link:string) {
    await URLStorage.putURL(link);
}

async function sendFileWrapper(link:string) {
    await putURLWrapper(link);
    await sleep(5000);
    UserMetaStorage.sendToS3Object(uploadToS3Object);
}

//Function that checks whether URL string points to a valid pdf URL
export function validateURL(url:string) {
    //tries to create URL object with string, returns false if returns error
    try {
        new URL(url);
    } catch(err) {  
        return false;
    }

    //checks if extension is not html/css
    const urlParts = url.split(".");
    const extension = urlParts[urlParts.length - 1];
    if(extension.toLowerCase() === "html" || extension.toLowerCase() === "css") {
        return false;
    }
    return true;
}

function uploadToS3Object(accessKeyId:string, secretAccessKey:string, region:string, bucket:string, fileURL:string){

    // Access keys could be undefined if chrome storage returns undefined for a key that doesn't exist
    if (accessKeyId !== undefined && secretAccessKey !== undefined && region !== undefined && bucket !== undefined && fileURL !== undefined){

        const s3Obj = new UserS3(accessKeyId, secretAccessKey, region);
        s3Obj.changeBucket(bucket);
        
        let dateTime = new Date();
        s3Obj.uploadFileFromFetch(fileURL, s3Obj.whichBucket, dateTime.toString());
    }
}