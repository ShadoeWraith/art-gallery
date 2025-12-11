import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3 = new S3Client({});

// --- CONFIGURATION ---
// The full name of the destination bucket:
const DST_BUCKET_NAME = 'africa-curated-public';

// The folder/prefix within that bucket where resized images will go:
//const DST_FOLDER_PREFIX = "artwork/";

const TARGET_WIDTH = 800; // Target width for web gallery
// --- END CONFIGURATION ---

export const handler = async (event) => {
	// srcBucket might be 'my-gallery-upload'
	const srcBucket = event.Records[0].s3.bucket.name;
	// srcKey might be 'my-great-painting.jpg'
	const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

	// The full destination key becomes 'artwork/resized-my-great-painting.jpg'
	const dstKey = srcKey;

	try {
		// 1. Download image from Source Bucket
		const response = await s3.send(new GetObjectCommand({ Bucket: srcBucket, Key: srcKey }));
		const stream = response.Body;

		// Convert stream to buffer for Sharp
		const chunks = [];
		for await (const chunk of stream) chunks.push(chunk);
		const buffer = Buffer.concat(chunks);

		// 2. Resize using Sharp
		const resizedBuffer = await sharp(buffer)
			.resize({ width: TARGET_WIDTH })
			.jpeg({ quality: 80 }) // Compress to 80% quality JPEG
			.toBuffer();

		// 3. Upload to Destination Bucket
		await s3.send(
			new PutObjectCommand({
				Bucket: DST_BUCKET_NAME,
				Key: dstKey, // Use the new destination key
				Body: resizedBuffer,
				ContentType: 'image/jpeg'
			})
		);

		console.log(
			`Successfully resized ${srcBucket}/${srcKey} and uploaded to ${DST_BUCKET_NAME}/${dstKey}`
		);
	} catch (error) {
		console.error('Error processing image: ', error);
		throw error;
	}
};
