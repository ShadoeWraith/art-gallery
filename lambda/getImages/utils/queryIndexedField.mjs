import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from '../dynamoClient.js';
import { ARTWORK_TABLE, INDEX_MAP, PAGE_SIZE } from '../constants.js';

export async function queryIndexedField(field, value, tagList, startKey) {
	const indexName = INDEX_MAP[field];
	const expressionAttributeValues = { ':value': value };

	let filterExpression;
	if (tagList?.length) {
		filterExpression =
			`attribute_exists(tags) AND ` +
			tagList.map((_, i) => `contains(tags, :tag${i})`).join(' AND ');
		tagList.forEach((tag, i) => {
			expressionAttributeValues[`:tag${i}`] = tag;
		});
	}

	const command = new QueryCommand({
		TableName: ARTWORK_TABLE,
		IndexName: indexName,
		KeyConditionExpression: `${field} = :value`,
		...(filterExpression && { FilterExpression: filterExpression }),
		ExpressionAttributeValues: expressionAttributeValues,
		Limit: PAGE_SIZE,
		...(startKey && { ExclusiveStartKey: startKey })
	});

	const result = await docClient.send(command);
	return { items: result.Items || [], nextStartKey: result.LastEvaluatedKey || null };
}
