import React from "react";
import { URLStorage } from "./storage/store_url_array";

const VIEW_STATE_KEY = 'viewState';

//Creates a Context Menu right click option for saving pdf links
chrome.storage.session.get([VIEW_STATE_KEY], function(result) {
    let viewState = result[VIEW_STATE_KEY];
    if(viewState === 'file-transfer')
    {
        chrome.contextMenus.removeAll(function() {
            chrome.contextMenus.create({
                id: "rightclickoption",
                title: "Send with Uplink",
                contexts:["link"],
               });
        });
    }
});

//Listener for right click option that stores the link in memory
chrome.contextMenus.onClicked.addListener(function(info,tab){
    let link:string = info.linkUrl as string;

    //Updates the URL Array stored in memory with the new link
    URLStorage.putURL(link);
});
