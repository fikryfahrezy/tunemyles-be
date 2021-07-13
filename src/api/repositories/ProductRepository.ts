import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import sequelize from '../../databases/sequelize';
import { queryingBuilder } from '../utils/sql-query-builder';

export const getProducts: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getProducts(query) {
  let sqlQuery = `
    SELECT *
    FROM v_products vp
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getProductsByCategoryId: (
  categoryId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getProductsByCategoryId(categoryId, query) {
  let sqlQuery = `
    SELECT * 
    FROM (
      SELECT vp.*
      FROM v_products vp
        JOIN u_product_categories upc ON upc.id_u_product = vp.product_util_id
      WHERE upc.id_m_categories = :categoryId
    ) as products
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { categoryId },
  });
};
