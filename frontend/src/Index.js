import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import './styles.css';



class Index extends Component {
  render() {
    return (
      <div className="page">
        <Jumbotron className="banner">
          <div className="title">搜尋灣仔區撥款項目</div>
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
        </Jumbotron>
        <div className="title">
          最多人查看項目
        </div>

        <CategoryCard />
        <br/>
        <div className="border"/>
        <div className="title">
          項目選擇
        </div>
        <div className="border"/>
      </div>
    );
  }
}

export default Index;
