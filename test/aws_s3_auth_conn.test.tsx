import {MyS3Auth} from "../src/aws_s3_auth_conn";

describe("Validate successful bucket change", () => {
  test("Change User's S3 bucket", () => {

    // Construct S3 Auth object
    let s = new MyS3Auth("test", "test");
    expect(s.changeBucket("bucket")).toBeTruthy();
  });
});