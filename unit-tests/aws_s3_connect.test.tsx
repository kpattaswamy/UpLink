import {S3Client, HeadBucketCommand} from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import {UserS3} from "../src/aws_s3_connect";
import {UpdateStateMeta} from "../src/aws_s3_config_bucket";


// test function changeBucket
describe("Test changeBucket()", () => {
  test("Valid bucket name (non empty string)", () => {
    let s = new UserS3("test", "test");
    expect(s.changeBucket("bucket")).toBeTruthy();
  });

  test("Invalid bucket name (empty string)", () => {

    let s = new UserS3("test", "test");
    expect(s.changeBucket("")).toBeFalsy();
  });
});


// test function changeUser
describe("Test changeUser()", () => {
  test("Valid inputs (non empty key strings)", () => {
    let s = new UserS3("publicKey", "privateKey");
    expect(s.changeUser("changePublicKey", "changePrivateKey")).toBeTruthy();

  });

  test("Invalid inputs (empty key strings)", () => {
    let s = new UserS3("publicKey", "privateKey");
    expect(s.changeUser("", "")).toBeFalsy();
  });
});

// test function checkBucketAndChangeUI
describe("Test checkBucketAndChangeUI()", () => {
  const mockS3Client = mockClient(S3Client);

  beforeEach(() => {
    mockS3Client.reset();
  });

  
  test("Assert that the callback is being invoked", (done) => {

    let s = new UserS3("publicKey", "privateKey");
    s.changeBucket("test");

    mockS3Client.on(HeadBucketCommand).resolves({});
    s._s3Client = mockS3Client;

    const stateMeta : UpdateStateMeta = {
      setViewState: (s:string)=>{},
      view: 'file-transfer',
      setS3Obj: (s:UserS3)=>{},
      s3Obj: s,
    };

    const callback = (s:UpdateStateMeta):boolean => {
      expect(s).toBe(stateMeta);
      done();
      return true;
    }    
    s.checkBucketAndChangeUI(stateMeta, callback);
  });

  test("Assert that the callback is not being invoked", (done) => {

    let s = new UserS3("publicKey", "privateKey");
    s.changeBucket("test");

    //mockS3Client.on(HeadBucketCommand).rejects();
    mockS3Client.on(HeadBucketCommand).resolves({});

    s._s3Client = mockS3Client;

    const stateMeta : UpdateStateMeta = {
      setViewState: (state:string)=>{},
      view: 'file-transfer',
      setS3Obj: (s3:UserS3)=>{},
      s3Obj: s,
    };

    var checkFuncCall = {
      val: 0,
      modVal: function (s:UpdateStateMeta):boolean {
        console.log("in callback for fail")
        this.val = 5;
        return true;
      }
    }

    let callback = checkFuncCall.modVal;
    let cb = callback.bind(checkFuncCall);

    s.checkBucketAndChangeUI(stateMeta, cb);
    expect(checkFuncCall.val).toBe(0);
    done()

  });
});
