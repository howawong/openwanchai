import React, {Component} from 'react';


class SearchBar extends Component {
  render() {
    return (
      <div>
        <div className="searchBar">
          <div>
            <input type="text" placeholder="輸入項目名稱/關鍵詞/地點..." />
          </div>
          <div>
            預算
          </div>
          <div>
            開始日期
          </div>
        </div>
      </div>
    );
  }
};

export default SearchBar;
