import { APPS, APPS_CATEGORIES, CATEGORIES } from "../shopify-table-names";

export const selectCount = (table: string): string => {
  return(`SELECT COUNT(*) as c FROM ${table}`)
};

export const selectRowById = (id: number, table: string): string => {
  return(
    `SELECT *
    FROM ${table}
    WHERE id = ${id}
    `
  )
};

export const selectCategoryByTitle = (title: string): string => {
  return(`SELECT *
   FROM ${CATEGORIES} 
   WHERE title = '${title}'`);
};

export const selectAppCategoriesByAppId = (appId: number): string => {
  return(
    `SELECT
    ${APPS}.title AS app_title,
    ${APPS_CATEGORIES}.category_id,
    ${CATEGORIES}.title AS category_title
  FROM
    ${APPS}
  INNER JOIN
    ${APPS_CATEGORIES} ON ${APPS}.id = ${APPS_CATEGORIES}.app_id
  INNER JOIN
    ${CATEGORIES} ON ${APPS_CATEGORIES}.category_id = ${CATEGORIES}.id
  WHERE
    ${APPS}.id = ${appId}`
  )
};

export const selectUnigueRowCount = (tableName: string, columnName: string): string => {
  return(
    `SELECT COUNT(DISTINCT ${columnName}) as c
    FROM ${tableName}
    `
  )
};

export const selectReviewByAppIdAuthor = (appId: number, author: string): string => {
  return(
    `SELECT *
    FROM reviews
    WHERE app_id = ${appId} AND author = '${author}'`
  )
};

export const selectColumnFromTable = (columnName: string, tableName: string): string => {
  return(
    `SELECT ${columnName}
    FROM ${tableName}
  `)
};

