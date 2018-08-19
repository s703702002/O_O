import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { serialize, queryToObj } from '../utilis';

class Aside extends Component {
  minPrice = null;
  maxPrice = null;
  pushHistory(queryObj) {
    let {
      search,
    } = this.props.location;
    if (!search.length) {
      search = '?sort=desc';
    }
    const queryObject = queryToObj(search);
    const newQueryObj = {
      ...queryObject,
      ...queryObj,
    };
    if (newQueryObj.minPrice === '') delete newQueryObj.minPrice;
    if (newQueryObj.maxPrice === '') delete newQueryObj.maxPrice;
    const newQuery = `?${serialize(newQueryObj)}`;
    this.props.history.push(newQuery);
  }
  // 價格排序change event
  sortOnChange(value) {
    this.pushHistory({
      sort: value,
    });
  }
  // 價格區間篩選
  filterPrice = () => {
    const minPrice = this.minPrice.value;
    const maxPrice = this.maxPrice.value;
    const obj = {
      minPrice,
      maxPrice,
    };
    this.pushHistory(obj);
  }
  // 性別radio change event
  genderOnChange = (e) => {
    this.pushHistory({
      gender: e.target.value,
    });
  }
  clearAll = () => {
    this.minPrice.value = '';
    this.maxPrice.value = '';
    this.props.history.push('');
  }
  render() {
    const {
      search,
    } = this.props.location;
    const { className } = this.props;
    const queryObject = search.length > 0 && queryToObj(search);

    return (
      <aside className={cx('filter_section', className)}>
        <section className="order_box">
          <header className="mb-2">排序</header>
          <section>
            <button
              className={cx('btn btn-outline-primary', {
                active: queryObject.sort === 'desc',
              })}
              onClick={() => { this.sortOnChange('desc'); }}
            >
              價格: 高至低
            </button>
            <button
              className={cx('btn btn-outline-primary', {
                active: queryObject.sort === 'asc',
              })}
              onClick={() => { this.sortOnChange('asc'); }}
            >
              價格: 低至高
            </button>
          </section>
        </section>
        <section className="filter_box">
          <header className="title mb-2">性別</header>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="maleRadio"
              name="gender"
              className="custom-control-input"
              value="male"
              checked={queryObject.gender === 'male'}
              onChange={this.genderOnChange}
            />
            <label className="custom-control-label" htmlFor="maleRadio">男裝</label>
          </div>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="femaleRadio"
              name="gender"
              className="custom-control-input"
              value="female"
              checked={queryObject.gender === 'female'}
              onChange={this.genderOnChange}
            />
            <label className="custom-control-label" htmlFor="femaleRadio">女裝</label>
          </div>
        </section>
        <section className="filter_box">
          <header className="title mb-2">價格區間</header>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="minPrice"
              min="0"
              defaultValue={queryObject.minPrice}
              placeholder="最低預算"
              ref={(e) => { this.minPrice = e; }}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              min="0"
              defaultValue={queryObject.maxPrice}
              placeholder="最高預算"
              ref={(e) => { this.maxPrice = e; }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.filterPrice}
          >
            篩選價格
          </button>
        </section>
        <section className="filter_box">
          <button
            className="btn btn-outline-danger"
            onClick={this.clearAll}
          >
            清除全部
          </button>
        </section>
      </aside>
    );
  }
}

export default withRouter(Aside);
