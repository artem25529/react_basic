function performAPICall(url, params, method, body, setResponse) {
  setResponse({
    isDone: false,
    data: null,
    error: null,
    pages: null,
  });

  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  if (Object.keys(params).length > 0) {
    url = url + '?' + new URLSearchParams(params);
  }

  fetch(url, {
    method: method || 'GET',
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error response. Status: ${response.status}, status text: ${response.statusText}`,
        );
      }

      setResponse((prev) => ({
        ...prev,
        pages: parseLinkHeader(response.headers.get('Link')),
      }));

      return response.json();
    })
    .then((json) =>
      setResponse((prev) => ({
        ...prev,
        data: json,
        error: null,
        isDone: true,
      })),
    )
    .catch((error) =>
      setResponse({
        data: null,
        error: error,
        isDone: true,
      }),
    );
}

function parseLinkHeader(link) {
  const res = {};

  if (!link) {
    return res;
  }

  const parts = link.split(', ');

  parts.forEach((part) => {
    const linkToRel = part.split('; rel=');
    const match = linkToRel[0].match(/_page=(\d+)/);

    const page = match[1];
    const rel = linkToRel[1].replaceAll('"', '');

    res[rel] = page;
  });

  return res;
}

export default performAPICall;
