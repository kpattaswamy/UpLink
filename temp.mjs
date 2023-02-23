import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

var client = new S3Client({ 
    credentials: {
        accessKeyId: "",
        secretAccessKey: "",
    },
    region: "us-east-1",
});

const command = new HeadBucketCommand({ Bucket: "" });

var resVal = null;

// client.send(command).then(
//     (data) => {
//         console.log(data);
//         resVal = true;
//     }).catch(
//     (err) => {
//         console.error(err);
//         resVal = false;
//     }).finally(() => {
//         console.log("Done", resVal);
// });

// // console.log("after", resVal);    
// while (resVal == null) {
//     console.log("waiting");
// }

// console.log("after", resVal);

try {
    const data = await client.send(command);
    console.log(data);
    resVal = true;
} catch (err) {
    console.error(err);
    resVal = false;
} finally {
    console.log("Done", resVal);
}

console.log("after", resVal);
