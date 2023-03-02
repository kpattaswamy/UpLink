import { MyS3Auth } from '../aws_s3_auth_conn';

const ACCESS_KEY_ID_KEY = 'publicKey';
const SECRET_ACCESS_KEY_KEY = 'privateKey';
const REGION_KEY = 'region';

export class UserMetaStorage {

    static putUserS3Obj(user:MyS3Auth){
        // This function adds all user metadata to storage

        const accessKeyId = user._accessKeyId;
        const secretAccessKey = user._secretAccessKey;
        const region = user.region;

        chrome.storage.local.set({ [ACCESS_KEY_ID_KEY]: accessKeyId });
        chrome.storage.local.set({ [SECRET_ACCESS_KEY_KEY]: secretAccessKey });
        chrome.storage.local.set({ [REGION_KEY]: region });
    }
    
    static getUserS3Obj(onGetStorageKeyValue:(s1:string, s2:string, s3:string)=>void){
        // This function gets user metadata from chrome's storage
        // The param is a function which sets the state, it acts like call back
        
        chrome.storage.sync.get([
            ACCESS_KEY_ID_KEY,
            SECRET_ACCESS_KEY_KEY,
            REGION_KEY
        ], function(result) {
            onGetStorageKeyValue(result[ACCESS_KEY_ID_KEY], result[SECRET_ACCESS_KEY_KEY], result[REGION_KEY])
        });
    }
}
