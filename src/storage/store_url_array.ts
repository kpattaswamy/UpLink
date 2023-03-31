// Global key for accessing Array of URLs
const URL_KEY = 'urlKey';

export class URLStorage
{
    static putURL(url:string)
    {
        chrome.storage.session.get([URL_KEY], function(result) {
            console.log(result);
            let urlArray = result[URL_KEY] ?? [];
            console.log(urlArray);
            urlArray.push(url);
            console.log(urlArray);

            chrome.storage.session.set({ [URL_KEY]: urlArray });
        });
    }

    static getURLs(onGetStorageKeyValue:(a:Array<string>)=>void) {
        chrome.storage.session.get([URL_KEY], function(result) {
            onGetStorageKeyValue(result[URL_KEY]);
        });
    }

    static clearURLs(onGetStorageKeyValue:()=>void){
        chrome.storage.session.remove([URL_KEY], function() {
            onGetStorageKeyValue();
        });
    }  
}