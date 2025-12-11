import { ARTWORK_TABLE, PAGE_SIZE, INDEX_MAP } from './constants.js';
import { docClient } from './dynamoClient.js';
import { getImageIdsForTag } from './utils/getImageIdsForTag.js';
import { batchGetItems } from './utils/batchGetItems.js';
import { queryIndexedField } from './utils/queryIndexedField.js';
import { getAllItems } from './utils/getAllItems.js';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

export const handler = async (event) => {
	try {
		const queryParams = event.queryStringParameters || {};
		const startKey = queryParams.startKey ? JSON.parse(queryParams.startKey) : undefined;

		const { pathParameters } = event;
		const { id } = pathParameters || {};

		const filterParams = Object.fromEntries(
			Object.entries(queryParams).filter(([key]) => key !== 'startKey')
		);

		const indexedField = Object.keys(INDEX_MAP).find((key) => key in filterParams);
		const tagList = filterParams.tags
			?.split(',')
			.map((tag) => tag.trim().toLowerCase())
			.filter(Boolean);

		let Items = [];
		let nextStartKey = null;

		if (id) {
			const command = new GetCommand({
				TableName: ARTWORK_TABLE,
				Key: { id }
			});

			const data = await docClient.send(command);
			Items = data.Item ? [data.Item] : [];
		} else if (indexedField) {
			const value = filterParams[indexedField];
			const result = await queryIndexedField(indexedField, value, tagList, startKey);
			Items = result.items;
			nextStartKey = result.nextStartKey;
		} else if (tagList?.length) {
			// Step 1: Get image IDs for each tag
			const imageIdSets = await Promise.all(tagList.map(getImageIdsForTag));

			// Step 2: Intersect the sets to find common IDs
			const matchingImageIds = imageIdSets.reduce((a, b) => a.filter((id) => b.includes(id)));

			// Step 3: Remove duplicates and preserve order
			const uniqueImageIds = [...new Set(matchingImageIds)];

			// Step 4: Find start index for pagination
			let startIndex = 0;
			if (startKey?.id) {
				const foundIndex = uniqueImageIds.indexOf(startKey.id);
				if (foundIndex !== -1) {
					startIndex = foundIndex + 1; // skip the last item from previous page
				} else {
					console.warn('startKey.id not found — starting from beginning');
				}
			}

			// Step 5: Slice the IDs for this page
			const paginatedIds = uniqueImageIds.slice(startIndex, startIndex + PAGE_SIZE);

			// Step 6: Fetch items in order
			Items = await batchGetItems(paginatedIds);

			// Step 7: Only return nextStartKey if there are more IDs left
			const hasMore = startIndex + PAGE_SIZE < uniqueImageIds.length;
			nextStartKey = hasMore ? { id: paginatedIds[paginatedIds.length - 1] } : null;
		} else {
			const result = await getAllItems(startKey);
			Items = result.items;
			nextStartKey = result.nextStartKey;
		}

		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				count: Items.length,
				Items,
				nextStartKey: nextStartKey ? JSON.stringify(nextStartKey) : null
			})
		};
	} catch (error) {
		console.error('Error querying DynamoDB:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Internal Server Error' })
		};
	}
};
