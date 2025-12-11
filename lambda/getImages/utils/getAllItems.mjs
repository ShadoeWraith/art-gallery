import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../dynamoClient.js';
import { ARTWORK_TABLE, PAGE_SIZE } from '../constants.js';

export async function getAllItems(startKey) {
	let items = [];
	let ExclusiveStartKey = startKey;
	let nextStartKey = null;

	do {
		const command = new ScanCommand({
			TableName: ARTWORK_TABLE,
			Limit: PAGE_SIZE - items.length,
			...(ExclusiveStartKey && { ExclusiveStartKey })
		});

		const result = await docClient.send(command);
		items.push(...(result.Items || []));
		ExclusiveStartKey = result.LastEvaluatedKey;

		if (items.length >= PAGE_SIZE) {
			nextStartKey = result.LastEvaluatedKey || null;
			break;
		}
	} while (ExclusiveStartKey);

	return { items, nextStartKey };
}
