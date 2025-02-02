function performAPICall(url, params, method, body, setResponse) {
  setResponse({
    data: null,
    error: null,
    isDone: false,
  });

  const urlWParams = url + '?' + new URLSearchParams(params);

  fetch(urlWParams, {
    method: method,
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error response. Status: ${response.status}, status text: ${response.statusText}`,
        );
      }

      return response.json();
    })
    .then((json) =>
      setResponse({
        data: json,
        error: null,
        isDone: true,
      }),
    )
    .catch((error) =>
      setResponse({
        data: null,
        error: error,
        isDone: true,
      }),
    );
}

export default performAPICall;
