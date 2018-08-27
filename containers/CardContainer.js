import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Card from '../components/Card';
import NoMatchCard from '../components/NoMatchCard';
import Aside from './Aside';
import { getProductsRequest } from '../action';
import {
  queryToObj,
  pushHistory,
} from '../utilis';

function goPage(pageNum) {
  const queryObj = {
    page: pageNum,
  };
  pushHistory(queryObj);
}

// 計算pageController 需要的陣列
function calcRenderButton(nowpage, limit, totalLength) {
  const startPageNum = Math.floor(nowpage / limit);
  const last = totalLength % limit;
  if ((nowpage + limit) >= totalLength) {
    return [...new Array(last)].map((v, i) => totalLength - i).reverse();
  }
  const arr = [...new Array(limit)].map((v, i) => (startPageNum * limit) + i + 1);
  arr.push('...');
  return arr;
}

const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);

const PageController = ({
  activePage,
  maxPage,
  renderButton,
}) => (
  <div className="col-12 page_controller">
    <button
      className="material-icons"
      onClick={() => {
        if (activePage === 0) return;
        goPage(activePage - 1);
      }}
    >
      keyboard_arrow_left
    </button>
    {
      renderButton.map((v) => {
        if (v === '...') return <span key={v}>{v}</span>;
        return (
          <button
            key={v}
            className={cx('page_num', { active: (v - 1) === activePage })}
            onClick={() => { goPage(v - 1); }}
          >
            {v}
          </button>
        );
      })
    }
    <button
      className="material-icons"
      onClick={() => {
        if (activePage === maxPage) return;
        goPage(activePage + 1);
      }}
    >
      keyboard_arrow_right
    </button>
  </div>
);

class CardContainer extends Component {
  static propTypes = {
    limit: PropTypes.number,
    pageController: PropTypes.number,
  };
  static defaultProps = {
    limit: 20, // 一頁要顯示幾筆資料
    pageController: 7,
  };
  componentDidMount() {
    const {
      dispatch,
      products,
    } = this.props;
    // 若沒有產品, 發request
    if (!products.length) dispatch(getProductsRequest());
  }
  renderProducts() {
    // 負責處理render的邏輯
    const {
      products,
    } = this.props;

    let {
      search,
    } = this.props.location;

    // 若沒有sort參數, 預設降冪排列
    if (!search.length) {
      search = '?sort=desc&page=0';
    }
    const queryObject = queryToObj(search);
    let renderArray = products.slice();
    // 價格排序
    if (queryObject.sort === 'desc') {
      renderArray.sort((a, b) => b.price - a.price);
    } else if (queryObject.sort === 'asc') {
      renderArray.sort((a, b) => a.price - b.price);
    }

    // 性別
    if (queryObject.gender === 'male') {
      renderArray = renderArray.filter(item => item.gender === 1);
    } else if (queryObject.gender === 'female') {
      renderArray = renderArray.filter(item => item.gender === 0);
    }

    // 價格區間
    if (queryObject.minPrice) {
      renderArray = renderArray.filter(item => item.price > Number(queryObject.minPrice));
    }
    if (queryObject.maxPrice) {
      renderArray = renderArray.filter(item => item.price < Number(queryObject.maxPrice));
    }

    // 若篩選後無符合的產品
    if (!renderArray.length) return <NoMatchCard />;

    return this.renderContent(renderArray, queryObject);
  }
  renderContent(renderArray, queryObject) {
    const {
      limit,
      pageController,
    } = this.props;

    let {
      page,
    } = queryObject;
    // 字串轉數字
    page = Number(page);

    // 計算該頁需要redner的產品
    const startIndex = page * limit;
    const overIndex = startIndex + limit;
    const limitRender = renderArray.slice(startIndex, overIndex);

    // 算出總共需要幾頁
    const pageLength = Math.ceil(renderArray.length / limit);
    // 計算pageController需要的陣列
    const renderButton = calcRenderButton(page, pageController, pageLength);
    console.log('pageLength', pageLength);
    console.log('renderButton', renderButton);
    if (!limitRender.length) return <NoMatchCard />;

    return (
      <React.Fragment>
        {
          limitRender.map(item => (
            <Card
              key={item.id}
              item={item}
              col={3}
            />
          ))
        }
        <PageController
          activePage={page}
          maxPage={pageLength - 1}
          renderButton={renderButton}
        />
      </React.Fragment>
    );
  }
  render() {
    const { products } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Aside className="col-2" />
          <div className="col-10">
            <div className="row">
              {
                (!products.length) ?
                  <LoadingProducts /> :
                  this.renderProducts()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.products;
  return {
    products,
  };
};

export default withRouter(connect(mapStateToProps)(CardContainer));
