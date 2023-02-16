chrome.contextMenus.create({
    title: "Save PDF",
    contexts:["selection"],  
    onclick: savePDF
   });

function savePDF(): void{
    console.log("Right Click Option Selected")
}