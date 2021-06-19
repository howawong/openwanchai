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
	<span className="link"><a href="https://www.districtcouncils.gov.hk/wc/tc_chi/welcome/welcome.html" target="_blank">資料來源</a></span>&nbsp;
	<span className="link"><a href="/CSV%20files.zip">下載 CSV</a></span>&nbsp;
	<span className="link"><a href="/SHP files.zip">下載 SHP</a></span>&nbsp;
      </div>
    </footer>
  );
}
