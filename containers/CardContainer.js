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

const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);

const goPage = (pageNum) => {
  const queryObj = {
    page: pageNum,
  };
  pushHistory(queryObj);
};

class CardContainer extends Component {
  static propTypes = {
    limit: PropTypes.Number,
  };
  static defaultProps = {
    limit: 8,
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
    } = this.props;

    let {
      page,
    } = queryObject;
    // 字串轉數字
    page = Number(page);

    // 計算該頁需要redner的產品
    const limitRender = renderArray.filter((item, idx) => {
      const startIndex = page * limit;
      const overIndex = startIndex + limit;
      return idx >= startIndex && idx < overIndex;
    });

    // 算出總共需要幾頁
    const pageLength = Math.ceil(renderArray.length / limit);
    const renderButton = [...new Array(pageLength)];
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
        {
          <div className="col-12 page_controller">
            <button
              className="material-icons"
              onClick={() => {
                if (page === 0) return;
                goPage(page - 1);
              }}
            >
              keyboard_arrow_left
            </button>
            {
              renderButton.map((v, i) => (
                <button
                  className={cx('page_num', { active: i === page })}
                  onClick={() => { goPage(i); }}
                >
                  {i + 1}
                </button>
              ))
            }
            <button
              className="material-icons"
              onClick={() => {
                if (page === (pageLength - 1)) return;
                goPage(page + 1);
              }}
            >
              keyboard_arrow_right
            </button>
          </div>
        }
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
