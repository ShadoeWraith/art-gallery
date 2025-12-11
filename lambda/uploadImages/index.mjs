import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event) => {
	let body;

	try {
		if (typeof event.body === 'string') {
			body = JSON.parse(event.body);
		} else if (typeof event.body === 'object' && event.body !== null) {
			body = event.body;
		} else {
			body = event;
		}
	} catch (error) {
		return createResponse(400, { error: 'Invalid JSON format in request body' });
	}

	const { prefix, title } = body;

	const command = new PutObjectCommand({
		Bucket: 'artgallery-images',
		Key: `${prefix}/${title}.jpg`,
		ContentType: 'image/jpeg'
	});

	try {
		const url = await getSignedUrl(client, command, { expiresIn: 3600 });
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: url })
		};
	} catch (error) {
		console.log(error);
	}
};
