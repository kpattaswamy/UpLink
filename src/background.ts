import React from "react";
import { FileTransfer } from "./aws_s3_file_transfer";
import { UserS3 } from './aws_s3_connect';

console.log("welcome to uplink from console");
let links: string[] = ["String"];
//Initialize populated array of strings for URLs

// Props that will be derived from  App class
type Props = {
    onViewChange? : (s:string)=>void,
    onS3ObjChange? : (o:UserS3)=>void,
    existingS3Obj? : UserS3
  };

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

    console.log(links);
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