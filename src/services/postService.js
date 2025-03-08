import performAPICall from '../utils/performAPICall.js';
import getResourceAsync from '../utils/getResouceAsync.js';

const POSTS_URL = 'http://localhost:3000/posts';

const postService = {
  getPosts(searchParams, page, limit, setResponse) {
    const params = {};

    if (searchParams?.query) {
      params.q = searchParams.query;
    }

    if (searchParams?.sort) {
      params._sort = `statistics.${searchParams.sort}`;
      params._order = searchParams?.order || 'asc';
    }

    params._page = page || 1;
    params._limit = limit || 5;

    performAPICall(POSTS_URL, params, 'GET', null, setResponse);
  },

  async getPostsByFieldsAsync(fields) {
    return await getResourceAsync(POSTS_URL, fields);
  },
};

export default postService;
