// import { S3 } from "@aws-sdk/client-s3"
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"; // ES Modules import


export class MyS3Auth {
  s3Client:     S3Client
  validUser:    boolean

  whichBucket:  string
  region:       string

  constructor (publicKey : string, privateKey : string, _region : string = "Global") {
    if (publicKey.length === 0 || privateKey.length === 0) {
      throw new Error("Public and private keys cannot be empty")
    }
    
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

  checkValidUser() : boolean{
    try {
      const command = new HeadBucketCommand({ Bucket: this.whichBucket })
      const data = this.s3Client.send(command)
      console.log("Success", data)
      this.validUser = true
    } catch (err) {
      this.validUser = false
      console.log("Error", err)
    } finally {
      return this.validUser
    }
  }
}
