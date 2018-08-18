import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container">
    <h1 className="text-danger">很抱歉，查無此頁面</h1>
    <Link to="/">點我回首頁</Link>
  </div>
);

export default NotFound;
