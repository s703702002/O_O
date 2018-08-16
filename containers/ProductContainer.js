import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import {
  getProductsRequest,
  addToCartRequest,
} from '../action';
import { getRandomItem } from '../utilis';
import Card from '../components/Card';
import Counter from '../components/Counter';

const dataImg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22980%22%20height%3D%22270%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20980%20270%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1651ec9a4f5%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A49pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1651ec9a4f5%22%3E%3Crect%20width%3D%22980%22%20height%3D%22270%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22364.671875%22%20y%3D%22156.9%22%3E980x270%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const LoadProduct = () => (
  <p>正在載入產品</p>
);
class ProductContainer extends Component {
  static renderProduct(product) {
    const {
      title,
    } = product;
    return (
      <div className="col-8">
        <h3>{title}</h3>
        <img
          className="mw-100"
          src={dataImg}
          title={title}
          alt={title}
        />
        <p className="mt-1">
          商品描述商品描述商品描述商品描述商品描述商品描述
          商品描述商品描述商品描述商品描述商品描述商品描述
          商品描述商品描述商品描述商品描述商品描述商品描述
        </p>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.counter = null;
  }
  componentDidMount() {
    const {
      dispatch,
      products,
    } = this.props;
    if (!products.length) dispatch(getProductsRequest());
  }
  // 加入購物車
  addToCart = (product) => {
    const { dispatch } = this.props;
    const { count } = this.counter.state;
    // 若選購數量為0
    if (count === 0) return;
    dispatch(addToCartRequest(product, count));
  }
  renderAside(product) {
    const {
      history: { push },
    } = this.props;
    const {
      price,
      inventory,
    } = product;

    const CounterWithMax = ({ innerRef }) => <Counter max={inventory} ref={innerRef} />;

    return (
      <aside className="col-4">
        <h3>
          <span className="sub-title">售價:</span>
          <strong>{`$${price}`}</strong>
        </h3>
        <div className="mb-2">
          <span className="sub-title">庫存:</span>
          <span>
            {inventory}件
          </span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="sub-title">選購數量:</span>
          <CounterWithMax innerRef={(e) => { this.counter = e; }} />
        </div>
        <button
          className="btn btn-outline-primary w-100 mb-2"
          onClick={() => { this.addToCart(product); }}
        >
          加入購物車
        </button>
        <button
          className="btn btn-outline-info w-100 mb-2"
          onClick={() => { push('/'); }}
        >
          繼續選購
        </button>
      </aside>
    );
  }
  renderOther(product) {
    const { products } = this.props;
    const { id } = product;
    const otherProducts = products.filter(item => item.id !== id);
    const renderList = getRandomItem(otherProducts, 6);
    if (!renderList) return null;
    return (
      <section className="col-12">
        <h4>其他商品</h4>
        <div className="row">
          {
            renderList.map(item => (
              <Card
                key={item.id}
                item={item}
                col={2}
              />))
          }
        </div>
      </section>
    );
  }
  renderContent(product) {
    return (
      <React.Fragment>
        {
          ProductContainer.renderProduct(product)
        }
        {
          this.renderAside(product)
        }
        {
          this.renderOther(product)
        }
      </React.Fragment>
    );
  }
  render() {
    const {
      products,
      match: { params: { productId } },
    } = this.props;
    const product = products.filter(item => item.id === productId)[0];
    return (
      <div className="container">
        <div className="row">
          {
            !products.length
            ? <LoadProduct />
            : this.renderContent(product)
          }
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

export default withRouter(connect(mapStateToProps)(ProductContainer));
