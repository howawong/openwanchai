const rootPath = () => {
  return process.env.REACT_APP_API_URL;
};

exports.fetchDetail = (detailId) => {
  const root = rootPath();
  return fetch(root + "/sample/detail?id=" + detailId).then(res => res.json());
};

exports.fetchList = (keyword, minDate, maxDate, minAmount, maxAmount, page, size) => {
  const root = rootPath();
  var url = root
              + "/sample/dmw?"
  if (minDate.length > 0) {
    url = url + "&min_date=" + minDate;
  }

  if (maxDate.length > 0) {
    url = url + "&max_date=" + maxDate;
  }

  url = url   + "&min_ballpark=" + minAmount
              + "&max_ballpark=" + maxAmount
              + "&keyword=" + keyword
              + "&page=" + page
              + "&size=" + size;
  return fetch(url).then(res => res.json());
}


exports.fetchCategories = () => {
  const root = rootPath();
  const url = root
              + "/sample/categories";
  return fetch(url).then(res => res.json());
}

exports.fetchHot = () => {
  const root = rootPath();
  const url = root
              + "/sample/hot";
  return fetch(url).then(res => res.json());
}

