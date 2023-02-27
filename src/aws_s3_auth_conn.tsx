import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"; // ES Modules import

export class MyS3Auth {
  // S3Client object
  s3Client:     S3Client
  validUser:    boolean

  // S3Client parameters
  whichBucket:  string
  region:       string


  constructor (publicKey : string, privateKey : string, _region : string = "us-east-1") {
    if (publicKey.length === 0 || privateKey.length === 0) {
      throw new Error("Public and private keys cannot be empty")
    }
    
    // Default region is us-east-1 (N. Virginia), needed for S3Client
    this.region = _region

    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: publicKey,
        secretAccessKey: privateKey,
      },
      region: this.region,
    })

    this.whichBucket = ""
    this.validUser = false
  }


  // Change the user's keys
  changeUser(publicKey : string, privateKey : string) {
    if (publicKey.length === 0 || privateKey.length === 0) {
      throw new Error("Public and private keys cannot be empty")
    }
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: publicKey,
        secretAccessKey: privateKey,
      },
      region: this.region,
    })
    this.validUser = false
  }

  // Change the bucket name
  changeBucket(bucketName : string) : boolean {
    if (bucketName.length === 0) {
      throw new Error("Bucket name cannot be empty");
    }
    this.whichBucket = bucketName
    this.validUser = false

    // Returning true for unit tests
    return true;
  }

  // Check if the user's keys are valid for specified bucket
  // Code after this function call will likely execute before this function finishes
  checkAndDisplayValidUser(fnSucceed : (args : string) => any, args : string ) {
    const command = new HeadBucketCommand({ Bucket: this.whichBucket })
    this.s3Client.send(command).then((data) => {
      console.log(data)
      fnSucceed(args)
    }).catch((err) => {
      console.log(err)
    })
  }
}
