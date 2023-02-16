import { S3 } from "aws-sdk"

export class S3Upload {
  // Not storing this here until encryption method figured out
  // accessKeyId:  string
  // secretAccessKey: string

  myS3:         S3
  // fileObj: FileParametersS3    I'm not sure how to use this interface yet
  whichBucket:  string | null = null
  fileTitle:    string | null = null
  fileContent:  string | null = null     // Bytes array may be better?

  constructor (publicKey : string, privateKey : string) {
    // this.accessKeyId = publicKey
    // this.secretAccessKey = privateKey
    this.myS3 = new S3({
      accessKeyId: publicKey,
      secretAccessKey: privateKey,
    })

    // write code to check if the keys are valid
  }

  // Write a function to check if the keys are valid or not
  // checkIfS3KeysValid() : boolean {
  //   // check if this.myS3 has valid
  //   this.myS3.che
  // }


  // checkIfKeysValid () : boolean {
  //   // check if this.myS3 has valid 

  //   let returnFlag = true

  //   this.myS3.listBuckets(function(err, data) {
  //     if (err) {
  //       console.log("Key error:\n" + err)
  //       returnFlag = false
  //     }
  //   })

  //   return returnFlag
  // }

  setFileParametersS3(bucket: string, fileName: string, fileContent: string) {
    this.whichBucket = bucket
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

    let returnFlag = false

    this.myS3.putObject({
      Bucket: this.whichBucket,
      Key: this.fileTitle,
      Body: this.fileContent
    }, function(err, data) {
      if (err) {
        console.log(err, err.stack)
      } else {
        console.log(data)
        returnFlag = true
      }
    })

    return returnFlag
  }
}


//Original JS code

/*

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIA56TBNZLL37S5MSVF',
  secretAccessKey: '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',
});

// console.log("lol");
const fdir = "text.txt";
// const fileContent = fs.open("test.txt", "r"); // The content of the file you want to upload.
const fileContent = "54321";
const fileName = "not_test.txt"; // The name you want to give the file in S3.
const bucketName = "testingseniordesign"; // The name of the S3 bucket where you want to upload the file.

const params = {
  Bucket: bucketName,
  Key: fileName,
  Body: fileContent,
};

s3.putObject(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});



*/