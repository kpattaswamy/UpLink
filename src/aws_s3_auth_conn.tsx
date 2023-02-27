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
  changeBucket(bucketName : string) {
    if (bucketName.length === 0) {
      throw new Error("Bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.validUser = false
  }


  // Check if the user's keys are valid for specified bucket
  checkValidUser() {
    try {
      const headBucketCommand = new HeadBucketCommand({
        Bucket: this.whichBucket,
      })
      this.s3Client.send(headBucketCommand)
      this.validUser = true
    } catch (err) {
      this.validUser = false
      console.log("Error", err)
    } finally {
      console.log("Finished checking user")
    }
  }


  private getS3Data() : Promise<any> {
    return new Promise((resolve, reject) => {
      const res = this.s3.headBucket({Bucket: this.whichBucket}, function(err, data) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          console.log("Successful")
          resolve(data)
        }
      })
    })
  }

  checkValidUserPro() : boolean {
    this.getS3Data().then((res) => {
      console.log("Successful" + res)
      this.validUser = true
      return true
    }).catch((err) => {
      console.log(err)
      this.validUser = false
      return false
    })
    return false
  }
}
