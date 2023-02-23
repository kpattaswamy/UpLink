import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

var client = new S3Client({ 
    credentials: {
        accessKeyId: "",
        secretAccessKey: "",
    },
    region: "us-east-1",
});

const command = new HeadBucketCommand({ Bucket: "arc" });

var resVal = null;

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
