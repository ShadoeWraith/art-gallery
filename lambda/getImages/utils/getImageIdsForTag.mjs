import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../dynamoClient.js';
import { TAG_TABLE } from '../constants.js';

export async function getImageIdsForTag(tag) {
	const imageIds = [];
	let ExclusiveStartKey;

	try {
		do {
			const params = {
				TableName: TAG_TABLE,
				KeyConditionExpression: 'tag = :tag',
				ExpressionAttributeValues: { ':tag': tag },
				ProjectionExpression: 'imageId',
				...(ExclusiveStartKey && { ExclusiveStartKey })
			};

			const result = await docClient.send(new QueryCommand(params));
			imageIds.push(...(result.Items?.map((item) => item.imageId) || []));
			ExclusiveStartKey = result.LastEvaluatedKey;
		} while (ExclusiveStartKey);
	} catch (err) {
		console.error(`Error querying tag "${tag}":`, err);
	}

	return imageIds;
}
