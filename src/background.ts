import React from "react";
import { URLStorage } from "./storage/store_url_array";

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

    URLStorage.putURL(link);
});

//Function checks if url string can be converted to a valid URL, that points to a PDF
// function validateURL(URLstring: string): boolean{
//     try{
//         new URL(URLstring);
//         if(URLstring.substring(URLstring.length-3) != ".pdf")
//         {
//             console.log("Not a valid PDF link");
//             return false;
//         }
//         return true;
//     } catch(err){
//         console.log("Not a valid URL")
//         return false;
//     }
// }