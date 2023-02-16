import { S3 } from "aws-sdk"

export class S3Upload {
  myS3:         S3
  validUser:    boolean = false

  // File parameters
  whichBucket:  string
  fileTitle:    string | null = null
  fileContent:  string | null = null     // Bytes array may be better?

  constructor (publicKey : string, privateKey : string, bucketName : string) {
    this.whichBucket = bucketName
    this.myS3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
    })
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

  setFileParametersS3(fileName: string, fileContent: string) {
    this.fileTitle = fileName
    this.fileContent = fileContent
  }

  uploadFileToS3() : boolean {
    if (this.whichBucket == null) {
      console.log("Bucket not specified")
      return false
    }

    if (this.fileTitle == null || this.fileTitle == "") {
      console.log("File title not specified")
      return false
    }

    if (this.fileContent == null || this.fileContent == "") {
      console.log("No content within the file")
      return false
    }

    let returnFlag = true

    this.myS3.putObject({
      Bucket: this.whichBucket,
      Key: this.fileTitle,
      Body: this.fileContent
    }, function(err, data) {
      if (err) {
        console.log(err, err.stack)
        returnFlag = false
      } else {
        console.log(data)
      }
    })

    return returnFlag
  }
}
