import AWS from "aws-sdk";

export default async function handler(req, res) {
    if (req.method == "POST") {
        const { fileName, fileType } = req.body;

        if (!fileName || !fileType) {
            return res
                .status(400)
                .json({ message: "Missing fileName or fileType" });
        }

        try {
            // Configure AWS SDK
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
            });

            // Define the S3 upload parameters
            const params = {
                Bucket: process.env.AWS_S3_BUCKET, // Your bucket name
                Key: fileName, // The file name in S3
                Expires: 60, // URL expires in 60 seconds
                ContentType: fileType, // MIME type of the file
            };

            // Get a signed URL for direct upload
            const uploadURL = await s3.getSignedUrlPromise("putObject", params);

            return res.status(200).json({ uploadURL });
        } catch (error) {
            console.error("Error generating S3 upload URL:", error);
            return res
                .status(500)
                .json({ error, message: "Error generating upload URL" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}
