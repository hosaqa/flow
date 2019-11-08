const checkFetchStatus = response => {
  if (!response.ok) {
    throw response.status;
  }
  return response.json();
};

export default checkFetchStatus;
