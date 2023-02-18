import { S3 } from "aws-sdk"

export class MyS3Auth {
  myS3:         S3
  validUser:    boolean = false

  // File parameters
  whichBucket:  string
  // fileTitle:    string | null = null
  // fileContent:  string | null = null     // Bytes array may be better?

  constructor (publicKey : string, privateKey : string, bucketName : string) {
    if (publicKey.length == 0 || privateKey.length == 0 || bucketName.length == 0) {
      throw new Error("Public, private keys, and bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.myS3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
    })
  }

  changeUser(publicKey : string, privateKey : string) {
    if (publicKey.length == 0 || privateKey.length == 0) {
      throw new Error("Public and private keys cannot be empty")
    }
    this.myS3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
    })
    this.validUser = false
  }

  changeBucket(bucketName : string) {
    if (bucketName.length == 0) {
      throw new Error("Bucket name cannot be empty")
    }
    this.whichBucket = bucketName
    this.validUser = false
  }

  async checkValidUser() : Promise<boolean> {
    try {
      await this.myS3.headBucket({Bucket: this.whichBucket}).promise()
      console.log("Successful")
      this.validUser = true
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
