import React from 'react';

import { login } from '../action';

const Header = () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 className="my-0 mr-md-auto font-weight-normal">黑皮購物</h5>
    <button
      className="btn btn-outline-primary"
      onClick={() => { login('stanley'); }}
    >
        登入
    </button>
  </div>
);

export default Header;
