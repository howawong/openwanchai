import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default function B() {
  return (
    <Link className="back-button" to="/">
      <b>&lt;</b> &nbsp;&nbsp;返回
    </Link>
  );
}
