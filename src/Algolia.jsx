// algolia.js
import algoliasearch from 'algoliasearch/lite';

const appId = 'JV5YH3DTEB';
const apiKey = '00d334355a697c8f3fb91d7dcb19d5ac';
const indexName = 'jmc';

const searchClient = algoliasearch(appId, apiKey);

export { searchClient, indexName };
