import React, {Component} from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="section footer-classic context-dark bg-image footer">
      &nbsp;
      &nbsp;
      Copyright © {new Date().getFullYear()} 灣仔生猛<br/>
      <div>
        <span className="link"><Link to="/about">關於灣仔生猛</Link></span>
	<span className="link">資料來源</span>&nbsp;
	<span className="link">下載 CSV</span>&nbsp;
	<span className="link">下載 SHP</span>&nbsp;
      </div>
    </footer>
  );
}
