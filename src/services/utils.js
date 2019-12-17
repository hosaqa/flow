const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;

      throw error;
    }
    return data;
  });
};

const createStringParams = paramsObj => {
  const esc = encodeURIComponent;

  let q = Object.keys(paramsObj)
    .filter(paramItem => !!paramsObj[paramItem])
    .map(paramItem => `${esc(paramItem)}=${esc(paramsObj[paramItem])}`)
    .join('&');

  return q ? `?${q}` : '';
};

export { handleResponse, createStringParams };
