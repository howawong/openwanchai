const rootPath = () => {
  return process.env.REACT_APP_API_URL;
};

exports.fetchDetail = (detailId) => {
  const root = rootPath();
  return fetch(root + "/sample/detail?id=" + detailId).then(res => res.json());
};

exports.fetchStackedBarChart = () => {
  const root = rootPath();
  return fetch(root + "/sample/community_spending_by_committee").then(res => res.json());
};

exports.fetchTreeMap = (year=null) => {
  const root = rootPath();
  var q = "";
  if (year) {
    q = "?year=" + year.toString();
  }
  return fetch(root + "/sample/community_spending_by_organization" + q).then(res => res.json());
};



exports.fetchList = (keyword, minDate, maxDate, minAmount, maxAmount, page, size, categories) => {
  const root = rootPath();
  if (categories === undefined || categories === "") {
    categories = []
  }
  if (keyword === undefined) {
    keyword = ""
  }

  var url = root
              + "/sample/dmw?"
  minDate = minDate ?? "2010-01-01";
  maxDate = maxDate ?? "2021-03-01";
  keyword = keyword ?? "";
  if (minDate.length > 0) {
    url = url + "&min_date=" + minDate;
  }

  if (maxDate.length > 0) {
    url = url + "&max_date=" + maxDate;
  }
  console.log("cat", categories)
  url = url   + "&min_ballpark=" + minAmount
              + "&max_ballpark=" + maxAmount
              + "&keyword=" + keyword
              + "&page=" + page
              + "&size=" + size
	      + "&categories=" + categories.join(",");
  console.log(url);
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

