import { S3 } from "aws-sdk"

export class MyS3Auth {
  s3:           S3
  validUser:    boolean

  // File parameters
  whichBucket:  string

  constructor (publicKey : string, privateKey : string, bucketName : string) {
    if (publicKey.length === 0 || privateKey.length === 0 || bucketName.length === 0) {
      throw new Error("Public, private keys, and bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.validUser = false
    this.s3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
    })
  }

  changeUser(publicKey : string, privateKey : string) {
    if (publicKey.length === 0 || privateKey.length === 0) {
      throw new Error("Public and private keys cannot be empty")
    }
    this.s3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
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

  checkValidUserJanke() : boolean {
    var returnValue : boolean = false
    var doneFlag = 0
    this.s3.headBucket({Bucket: this.whichBucket}, function(err, data) {
      if (err) {
        console.log(err)
        doneFlag += 1
      } else {
        returnValue = true
        doneFlag += 1
      }
    })

    while (doneFlag === 0) {
      console.log(doneFlag)
    }
    return returnValue
  }

  async checkValidUser() : Promise<boolean> {
    try {
      const res = await this.s3.headBucket({Bucket: this.whichBucket}).promise()
      console.log("Successful")
      this.validUser = true
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
