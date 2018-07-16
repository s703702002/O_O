import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';

function parseQueyString(query) {
  if (query === '') return;

  const vars = query.split('&');
  const query_string = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === 'undefined') {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === 'string') {
      const arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

class Aside extends Component {
  onPriceClick(order) {
    const { history } = this.props;
    history.push(`?order=${order}`);
  }
  render() {
    let { search } = this.props.location;
    search = search.slice(1); // 去掉問號
    const obj = parseQueyString(search);
    console.log('123', obj);
    return (
      <aside className="filter_section">
        <section className="order_box">
          <header className="mb-2">排序</header>
          <section>
            <button
              className={cx('btn btn-outline-primary', {
                active: obj && obj.order === 'desc',
              })}
              onClick={() => { this.onPriceClick('desc'); }}
            >
              價格: 高至低
            </button>
            <button
              className={cx('btn btn-outline-primary', {
                active: obj && obj.order === 'asc',
              })}
              onClick={() => { this.onPriceClick('asc'); }}
            >
              價格: 低至高
            </button>
          </section>
        </section>
        <section className="filter_box">
          <header className="title mb-2">性別</header>
          <div className="custom-control custom-radio">
            <input type="radio" id="maleRadio" name="gender" className="custom-control-input" value="male" />
            <label className="custom-control-label" htmlFor="maleRadio">男裝</label>
          </div>
          <div className="custom-control custom-radio">
            <input type="radio" id="femaleRadio" name="gender" className="custom-control-input" value="female" />
            <label className="custom-control-label" htmlFor="femaleRadio">女裝</label>
          </div>
        </section>
        <section className="filter_box">
          <header className="title mb-2">價格區間</header>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter1" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter1">0 ~ 500</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter2" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter2">500 ~ 1000</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter3" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter3">1000 ~ 1500</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter4" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter4">1500 ~ 2000</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" id="priceFilter5" name="priceFilter" className="custom-control-input" />
            <label className="custom-control-label" htmlFor="priceFilter5">2000以上</label>
          </div>
        </section>
      </aside>
    );
  }
}

export default withRouter(Aside);
