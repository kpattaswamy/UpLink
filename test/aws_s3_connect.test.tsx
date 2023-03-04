import {UserS3} from "../src/aws_s3_connect";

describe("Validate successful bucket change", () => {
  test("Change User's S3 bucket", () => {

    // Construct S3 Auth object
    let s = new UserS3("test", "test");
    expect(s.changeBucket("bucket")).toBeTruthy();
  });
});