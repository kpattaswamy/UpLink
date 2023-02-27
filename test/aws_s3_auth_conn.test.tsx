//import { expect } from '@jest/globals';
import {MyS3Auth} from "../src/aws_s3_auth_conn";


describe("Check user ", () => {
  test("Change bucket of user", () => {
    let s = new MyS3Auth("abc", "abc");
    expect(s.changeBucket("bucket")).toBeTruthy();
  });
});


// import {sum} from '../src/aws_s3_auth_conn';
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });