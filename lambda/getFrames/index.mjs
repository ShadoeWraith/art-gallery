import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || 'Frames';

const createResponse = (statusCode, body) => {
	const responseBody = JSON.stringify(body);
	return {
		statusCode,
		headers: { 'Content-Type': 'application/json' },
		body: responseBody
	};
};

export const handler = async (event) => {
	const { pathParameters } = event;
	const { id } = pathParameters || {};

	try {
		let command;

		if (id) {
			command = new GetCommand({
				TableName: tableName,
				Key: {
					id: id
				}
			});
		} else {
			command = new ScanCommand({
				TableName: tableName
			});
		}

		const response = await docClient.send(command);
		return createResponse(200, response);
	} catch (error) {
		console.error('DynamoDB getImage error:', error);
		return createResponse(500, { error: error.message });
	}
};
