import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"; // ES Modules import

export class MyS3Auth {
  s3Client:     S3Client
  validUser:    boolean

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

  changeBucket(bucketName : string) {
    if (bucketName.length === 0) {
      throw new Error("Bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.validUser = false
  }

  changeRegion(region : string) {
    if (region.length === 0) {
      throw new Error("Region cannot be empty")
    }
    this.region = region
    this.validUser = false
  }

  checkValidUser() {
    try {
      const headBucketCommand = new HeadBucketCommand({
        Bucket: this.whichBucket,
      })
      this.s3Client.send(headBucketCommand)
    } catch (err) {
      this.validUser = false
      console.log("Error", err)
    } finally {
      this.validUser = true
      console.log("Finished checking user")
    }
  }
}
