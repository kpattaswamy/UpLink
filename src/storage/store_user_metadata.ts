import { UserS3 } from '../aws_s3_connect';

const ACCESS_KEY_ID_KEY = 'publicKey';
const SECRET_ACCESS_KEY_KEY = 'privateKey';
const REGION_KEY = 'region';
const BUCKET_KEY = 'bucket';
const URL_KEY = 'urlKey';

export class UserMetaStorage {

    static putUserS3Obj(user:UserS3){
        // This function adds all user metadata to storage

        const accessKeyId = user._accessKeyId;
        const secretAccessKey = user._secretAccessKey;
        const region = user.region;
        const bucket = user.whichBucket;

        chrome.storage.session.set({ [ACCESS_KEY_ID_KEY]: accessKeyId });
        chrome.storage.session.set({ [SECRET_ACCESS_KEY_KEY]: secretAccessKey });
        chrome.storage.session.set({ [REGION_KEY]: region });
        chrome.storage.session.set({ [BUCKET_KEY]: bucket });

    }
    
    static getUserS3Obj(onGetStorageKeyValue:(s1:string, s2:string, s3:string, s4:string)=>void){
        // This function gets user metadata from chrome's storage
        // The param is a function which sets the state, it acts like call back

        chrome.storage.session.get([
            ACCESS_KEY_ID_KEY,
            SECRET_ACCESS_KEY_KEY,
            REGION_KEY,
            BUCKET_KEY
        ], function(result) {
            onGetStorageKeyValue(result[ACCESS_KEY_ID_KEY], result[SECRET_ACCESS_KEY_KEY], result[REGION_KEY], result[BUCKET_KEY])
        });
    }

    static removeUserMeta(onGetStorageKeyValue:()=>void){
        // This function removes all user metadata from chrome's storage

        chrome.storage.session.remove([ACCESS_KEY_ID_KEY, SECRET_ACCESS_KEY_KEY, REGION_KEY, BUCKET_KEY], function() {
            onGetStorageKeyValue();
        });
    }

    static sendToS3Object(onGetStorageKeyValue:(s1:string, s2:string, s3:string, s4:string, s5:string)=>void){
        // This function gets user metadata from chrome's storage
        // The param is a function which sets the state, it acts like call back

        chrome.storage.session.get([
            ACCESS_KEY_ID_KEY,
            SECRET_ACCESS_KEY_KEY,
            REGION_KEY,
            BUCKET_KEY,
            URL_KEY
        ], function(result) {
            const urlArray = result[URL_KEY];
            const link = urlArray[urlArray.length - 1] ?? "";

            onGetStorageKeyValue(result[ACCESS_KEY_ID_KEY], result[SECRET_ACCESS_KEY_KEY], result[REGION_KEY], result[BUCKET_KEY], link)
        });
    }
}
