import React from "react";
import { URLStorage } from "./storage/store_url_array";

const VIEW_STATE_KEY = 'viewState';



//Creates a Context Menu right click option for saving pdf links
chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "rightclickoption",
        title: "Send with Uplink",
        contexts:["link"],
        visible:false,
    });
});

chrome.contextMenus.onClicked.addListener(function(info,tab){
    let link:string = info.linkUrl as string;

    //Updates the URL Array stored in memory with the new link
    URLStorage.putURL(link);
});