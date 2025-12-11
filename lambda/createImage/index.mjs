import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { PutCommand } from 'lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(dbClient);

const tableName = process.env.tableName || 'Artwork';

const createResponse = (statusCode, body) => {
	const responseBody = JSON.stringify(body);
	return {
		statusCode,
		headers: { 'Content-Type': 'application/json' },
		body: responseBody
	};
};

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

	const { artist, description, frameIds, tags, title, imageUrl, featured } = body;

	if (!artist || !imageUrl || !title) {
		return createResponse(409, { error: 'Missing required attributes for the request' });
	}

	const command = new PutCommand({
		TableName: tableName,
		Item: {
			id: uuidv4(),
			active: true,
			artist,
			description,
			frameIds,
			imageUrl,
			tags,
			title,
			featured
		},
		ConditionExpression: 'attribute_not_exists(id)'
	});

	try {
		const response = await docClient.send(command);
		return createResponse(201, { message: 'Image created successfully!', response });
	} catch (error) {
		if (error.message === 'The conditional request failed')
			return createResponse(409, { error: 'Image already exists!' });
		else return createResponse(500, { error: 'Internal Server Error!', message: error.message });
	}
};
