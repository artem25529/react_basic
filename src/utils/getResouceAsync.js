async function getResourceAsync(url, params) {
  if (params && Object.keys(params).length > 0) {
    url += '?' + new URLSearchParams(params);
  }

  const response = await fetch(url);
  return await response.json();
}

export default getResourceAsync;
