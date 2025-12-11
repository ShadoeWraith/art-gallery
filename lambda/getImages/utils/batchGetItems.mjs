import { BatchGetCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../dynamoClient.js';
import { ARTWORK_TABLE } from '../constants.js';

export async function batchGetItems(ids) {
	if (!Array.isArray(ids) || ids.length === 0) {
		console.warn('No IDs provided for batch get.');
		return [];
	}

	const keys = ids.map((id) => ({ id }));
	const params = {
		RequestItems: {
			[ARTWORK_TABLE]: { Keys: keys }
		}
	};

	const result = await docClient.send(new BatchGetCommand(params));
	const itemsById = Object.fromEntries(
		(result.Responses[ARTWORK_TABLE] || []).map((item) => [item.id, item])
	);

	return ids.map((id) => itemsById[id]).filter(Boolean); // preserves input order
}
