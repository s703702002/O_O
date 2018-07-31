import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { serialize, queryToObj } from '../utilis';

class Aside extends Component {
  pushHistory(key, value) {
    let {
      location: { search },
    } = this.props;
    if (!search.length) {
      search = '?sort=desc';
    }
    const queryObject = queryToObj(search);
    queryObject[key] = value;
    const newQuery = `?${serialize(queryObject)}`;
    this.props.history.push(newQuery);
  }
  render() {
    let {
      location: { search },
    } = this.props;
    if (!search.length) {
      search = '?sort=desc';
    }
    const queryObject = queryToObj(search);

    return (
      <aside className="filter_section">
        <section className="order_box">
          <header className="mb-2">排序</header>
          <section>
            <button
              className={cx('btn btn-outline-primary', {
                active: queryObject.sort === 'desc',
              })}
              onClick={() => { this.pushHistory('sort', 'desc'); }}
            >
              價格: 高至低
            </button>
            <button
              className={cx('btn btn-outline-primary', {
                active: queryObject.sort === 'asc',
              })}
              onClick={() => { this.pushHistory('sort', 'asc'); }}
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
              onChange={(e) => { this.pushHistory('gender', e.target.value); }}
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
              onChange={(e) => { this.pushHistory('gender', e.target.value); }}
            />
            <label className="custom-control-label" htmlFor="femaleRadio">女裝</label>
          </div>
        </section>
        <section className="filter_box">
          <header className="title mb-2">價格區間</header>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter1" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter1">0 ~ 1000</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter2" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter2">1000 ~ 2000</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter3" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter3">2000以上</label>
          </div>
        </section>
        <section className="filter_box">
          <button
            className="btn btn-outline-danger"
            onClick={() => { this.props.history.push(''); }}
          >
            清除全部
          </button>
        </section>
      </aside>
    );
  }
}

export default withRouter(Aside);
