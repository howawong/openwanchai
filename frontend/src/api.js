const rootPath = () => {
  return process.env.REACT_APP_API_URL;
};

exports.fetchDetail = (detailId) => {
  const root = rootPath();
  return fetch(root + "/sample/detail?objectID=" + detailId).then(res => res.json());
};

exports.fetchList = (keyword, minDate, maxDate, minAmount, maxAmount, page, size) => {
  const root = rootPath();
  const url = root
              + "/sample/dmw?"
              + "min_date=" + minDate
              + "&max_date=" + maxDate
              + "&min_ballpark=" + minAmount
              + "&max_ballpark=" + maxAmount
              + "&keyword=" + keyword
              + "&page=" + page
              + "&size=" + size;
  return fetch(url).then(res => res.json());
}

