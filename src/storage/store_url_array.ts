// Global key for accessing Array of URLs
const URL_KEY = 'urlKey';

export class URLStorage{
    
    // Gets URL array from memory, pushes link, and stores the updated Array
    static putURL(url:string){
        chrome.storage.session.get([URL_KEY], function(result) {
            let urlArray = result[URL_KEY] ?? [];
            urlArray.push(url);

            chrome.storage.session.set({ [URL_KEY]: urlArray });
        });
    }

    // Retrieves URL Array from memory
    static getURLArray(onGetStorageKeyValue:(a:Array<string>)=>void) {
        chrome.storage.session.get([URL_KEY], function(result) {
            onGetStorageKeyValue(result[URL_KEY]);
        });
    }

    // Clears URLs from URL array
    static removeURLArray(onGetStorageKeyValue:()=>void){
        chrome.storage.session.remove([URL_KEY], function() {
            onGetStorageKeyValue();
        });
    }  
}