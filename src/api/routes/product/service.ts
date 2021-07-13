import type CustModelType from '../../types/model';
import { getProducts, getProductsByCategoryId } from '../../repositories/ProductRepository';

export const getProductData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getProductData(query) {
  const resData = await getProducts(query);

  return resData;
};

export const productDataByCategory: (
  categoryId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function productDataByCategory(categoryId, query) {
  const resData = await getProductsByCategoryId(categoryId, query);

  return resData;
};
