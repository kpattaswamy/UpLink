import React from "react";
import { URLStorage } from "./storage/store_url_array";
import { UserS3 } from './aws_s3_connect';
import { UserMetaStorage } from "./storage/store_user_metadata";

const ACCESS_KEY_ID_KEY = 'publicKey';
const SECRET_ACCESS_KEY_KEY = 'privateKey';
const REGION_KEY = 'region';
const BUCKET_KEY = 'bucket';

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

chrome.contextMenus.onClicked.addListener(function(info){
    let link:string = info.linkUrl as string;

    if(validateURL(link)){
        URLStorage.putURL(link);

        UserMetaStorage.sendToS3Object(uploadToS3Object);


        // chrome.storage.session.get([ACCESS_KEY_ID_KEY], function(result1) {
        //     chrome.storage.session.get([SECRET_ACCESS_KEY_KEY], function(result2) {
        //         chrome.storage.session.get([REGION_KEY], function(result3) {
        //             const accessKey = result1[ACCESS_KEY_ID_KEY];
        //             const secretKey = result2[SECRET_ACCESS_KEY_KEY];
        //             const region = result3[REGION_KEY];
    
        //             const s3Obj = new UserS3(accessKey, secretKey, region);
        //             let dateTime = new Date();
        //             s3Obj.uploadFile(link, s3Obj.whichBucket, dateTime.toString());
        //         });
        //     });
        // });
    }
});

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
        s3Obj.uploadFile(fileURL, s3Obj.whichBucket, dateTime.toString());
    }
}