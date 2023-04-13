import React from "react";
import { URLStorage } from "./storage/store_url_array";

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

    //Updates the URL Array stored in memory with the new link if link points to valid file
    if(validateURL(link)) {
        URLStorage.putURL(link);
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