import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: 'AKIAQM5Q6V76QQICFE7R',
		secretAccessKey: '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'
	}
});
