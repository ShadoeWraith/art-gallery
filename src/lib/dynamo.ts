import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { VITE_DYNAMO_ACCESS_KEY, VITE_DYNAMO_SECRET_KEY } from '$env/static/private';

export const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: VITE_DYNAMO_ACCESS_KEY,
		secretAccessKey: VITE_DYNAMO_SECRET_KEY
	}
});
