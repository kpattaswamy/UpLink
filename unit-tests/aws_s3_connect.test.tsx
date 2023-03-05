import {UserS3} from "../src/aws_s3_connect";

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
