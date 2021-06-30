import type CustModelType from '../../types/model';

export const getProductData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getProductData(query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const productDataByCategory: (
  categoryId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function productDataByCategory(categoryId, query) {
  const resData = await Promise.resolve('hi');

  return resData;
};
