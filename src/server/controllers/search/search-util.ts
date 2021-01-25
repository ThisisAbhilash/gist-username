import { query } from 'express-validator';
import { pick } from '../../utils/common';

type SearchResponse = {
  gists: any[];
};

const constants = {
  SEARCH_TYPES: ['gist'],
  GIST_FIELDS: [
    'id',
    'html_url',
    'files',
    'created_at',
    'description',
    'comments',
  ],
};


/**
 * Validate and sanitize gist search query params
 */
export const gistsQueryRules = [
  query('user_name')
    .trim()
    .escape()
    .isString()
    .withMessage('user_name is required'),
];


/**
 * format github api response as per our requirement
 * @param search_type
 * @param input
 * @param fields
 */
export const formatSearchResponse = (input: any): SearchResponse => {
  const output: SearchResponse = {
    gists: input.map((k: any) => pick(k, constants.GIST_FIELDS)),
  };
  return output;
};
