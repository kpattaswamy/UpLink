import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"; // ES Modules import
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

export class MyS3Auth {
  // S3Client and STSClient object
  private s3Client:     S3Client
  private stsClient:    STSClient
  private accessKeyId: string
  private secretAccessKey: string

  // MyS3Auth object properties
  validUser:    boolean
  validBucket:  boolean
  whichBucket:  string
  region:       string

  constructor (_accessKeyId : string, _secretAccessKey : string, _region : string = "us-east-1") {
    if (_accessKeyId.length === 0 || _secretAccessKey.length === 0) {
      throw new Error("Public and private keys cannot be empty");
    }

    // Populate keys
    this.accessKeyId = _accessKeyId;
    this.secretAccessKey = _secretAccessKey;
    
    // Default region is us-east-1 (N. Virginia), needed for S3Client
    this.region = _region;

    // Construct STSClient object
    this.stsClient = new STSClient({
      region: this.region,
      credentials: {
        accessKeyId: _accessKeyId,
        secretAccessKey: _secretAccessKey,
      },
    });

    // Construct S3Client object
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: _accessKeyId,
        secretAccessKey: _secretAccessKey,
      },
      region: this.region,
    });

    // Default properties of the user
    this.whichBucket = "";
    this.validUser = false;
    this.validBucket = false;
  }

  // Get privatized accessKey 
  get _accessKeyId() : string  {
    return this.accessKeyId;
  }

   // Get privatized secretAccessKey
  get _secretAccessKey() : string  {
    return this.secretAccessKey;
  }


  // Change the user's keys
  changeUser(publicKey : string, privateKey : string) {
    if (publicKey.length === 0 || privateKey.length === 0) {
      throw new Error("Public and private keys cannot be empty")
    }

    // Changing S3Client object
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: publicKey,
        secretAccessKey: privateKey,
      },
      region: this.region,
    });

    // Changing STSClient object
    this.stsClient = new STSClient({
      region: this.region,
      credentials: {
        accessKeyId: publicKey,
        secretAccessKey: privateKey,
      },
    });

    this.validUser = false;
  }

  // Change the bucket name
  changeBucket(bucketName : string) : boolean {
    if (bucketName.length === 0) {
      throw new Error("Bucket name cannot be empty");
    }
    this.whichBucket = bucketName;
    this.validUser = false;

    // Returning true for unit tests
    return true;
  }

  // Check if the user's keys are valid for specified bucket
  // Save the S3 object made upon validation
  // Code after this function call will likely execute before this function finishes
  checkAndDisplayValidBucket(setViewState : (args : string) => void, args : string, setS3Obj : (s3Obj : MyS3Auth) => void, s3Obj : MyS3Auth ) {
    
    const command = new HeadBucketCommand({ Bucket: this.whichBucket })
    this.s3Client.send(command).then((data) => {
      setS3Obj(s3Obj);
      setViewState(args);
      this.validBucket = true;
    }).catch((err) => {
      console.log(err);
      this.validBucket = false;
    });
  }


  // Check if the user's keys are valid
  // Code after this function call will likely execute before this function finishes
  checkAndDisplayValidUser(setViewState : (args : string) => void, args : string, setS3Obj : (s3Obj : MyS3Auth) => void, s3Obj : MyS3Auth ) {
    const command = new GetCallerIdentityCommand({})
    this.stsClient.send(command).then((data) => {
      setS3Obj(s3Obj);
      setViewState(args);
      this.validUser = true;
    }).catch((err) => {
      console.log(err);
      this.validUser = false;
    });
  }
}
