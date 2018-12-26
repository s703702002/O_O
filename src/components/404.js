import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container not_found text-danger">
    <h1>很抱歉，查無此頁面</h1>
    <div>
      <i className="material-icons text-danger">report</i>
    </div>
    <Link to="/">
      <button className="goIndex">回首頁</button>
    </Link>
  </div>
);

export default NotFound;
