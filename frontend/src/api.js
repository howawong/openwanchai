const rootPath = () => {
  return process.env.REACT_APP_API_URL;
};

exports.fetchDetail = (detailId) => {
  const root = rootPath();
  return fetch(root + "/sample/detail?objectID=" + detailId).then(res => res.json());
};

exports.fetchList = (min_year, max_year) => {
  const root = rootPath();
  return fetch(root + "/sample/dmw?min_year=" + min_year + "&max_year=" + max_year).then(res => res.json());
}

