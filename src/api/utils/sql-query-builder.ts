import type CustModelType from '../types/model';

export const queryingBuilder: (
  query: CustModelType['SearchQuery'],
) => string = function queryingBuilder({ availableFields, limit, offset, order, search }) {
  const lastIndex = availableFields.length - 1;
  let queryResult = availableFields.reduce((acc, field, i) => {
    if (i === lastIndex) return ` ${acc} ${field} LIKE '%${search}' `;
    return ` ${acc} ${i === 0 ? ' WHERE ' : ''} ${field} LIKE '%${search}%' OR `;
  }, '');

  queryResult += ` ORDER BY ${order.field} ${order.direction} LIMIT ${limit} OFFSET ${offset} `;

  return queryResult;
};

export default queryingBuilder;
