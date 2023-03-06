import React from "react";

console.log("welcome to uplink from console");
let links: string[] = ["String"];
//Initialize populated array of strings for URLs

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "rightclickoption",
        title: "Save PDF",
        contexts:["link"],
       });
});

chrome.contextMenus.onClicked.addListener(function(info,tab){
    let link:string = info.linkUrl as string;
    links.push(link);
    if(links[0] == "String")
    {
        links.shift();
    }
    //Push URL to link array and removes the 'String' placeholder
    console.log(links)
});