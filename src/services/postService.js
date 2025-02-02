import performAPICall from '../utils/performAPICall.js';

const POSTS_URL = 'http://localhost:3000/posts';

const postService = {
  getPosts(perPage, page, setResponse) {
    let params = null;

    if (perPage || page) {
      params = {
        _page: page ?? 1,
        _per_page: perPage ?? 5,
      };
    }

    performAPICall(POSTS_URL, params, 'GET', null, setResponse);
  },
};

export default postService;
