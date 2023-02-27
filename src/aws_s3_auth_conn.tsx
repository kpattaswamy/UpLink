import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"; // ES Modules import

export class MyS3Auth {
  // S3Client object
  private s3Client:     S3Client
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
  changeBucket(bucketName : string) {
    if (bucketName.length === 0) {
      throw new Error("Bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.validUser = false
  }


  // Access S3Client
  getS3Client() {
    return this.s3Client
  }


  // Return headBucket command object with bucket parameter
  getHeadBucketCommand() : HeadBucketCommand {
    return new HeadBucketCommand({ Bucket: this.whichBucket })
  }


  // Check if the user's keys are valid for specified bucket
}
