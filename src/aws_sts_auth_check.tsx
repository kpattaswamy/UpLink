import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

export class MySTSAuth {
  private stsClient:    STSClient;
  private region:       string;


  constructor(publicKey : string, privateKey : string, _region : string = "us-east-1") {
    this.region = _region;

    this.stsClient = new STSClient({
      region: this.region,
      credentials: {
        accessKeyId: publicKey,
        secretAccessKey: privateKey,
      },
    });
  }


  checkValidKeys(setViewState : (args : string) => any, args : string, setSTSObj : (s3Obj : MySTSAuth) => any, stsObj : MySTSAuth ) {
    const command = new GetCallerIdentityCommand({});
    this.stsClient.send(command).then((data) => {
        setSTSObj(stsObj);
        setViewState(args);
    }).catch((err) => {
        console.log(err);
    });
  }
}