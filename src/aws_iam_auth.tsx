import { IAMClient } from "@aws-sdk/client-iam";

export class MyIAMAuth {
    iamClient: IAMClient;
    validUser: boolean;

    // IAMClient parameters
    region: string;

    constructor (publicKey : string, privateKey : string, _region : string = "us-east-1") {
        if (publicKey.length === 0 || privateKey.length === 0) {
            throw new Error("Public and private keys cannot be empty")
        }
        
        // Default region is us-east-1 (N. Virginia), needed for S3Client
        this.region = _region

        this.iamClient = new IAMClient({
            credentials: {
                accessKeyId: publicKey,
                secretAccessKey: privateKey,
            },
            region: this.region,
        })

        this.validUser = false
    }


    // Change the user's keys
    changeUser(publicKey : string, privateKey : string) : boolean {
        if (publicKey.length === 0 || privateKey.length === 0) {
            throw new Error("Public and private keys cannot be empty")
        }
        this.iamClient = new IAMClient({
            credentials: {
                accessKeyId: publicKey,
                secretAccessKey: privateKey,
            },
            region: this.region,
        })
        this.validUser = false

        return true
    }

    // Check if the user's keys are valid
}