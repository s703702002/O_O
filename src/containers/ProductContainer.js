import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getProductsRequest,
  addToCartRequest,
  addLightBoxMessage,
} from '../action';
import {
  getRandomItem,
} from '../utilis';
import ProductInfo from '../components/ProductInfo';
import Card from '../components/Card';
import Counter from '../components/Counter';
import NotFound from '../pages/404';
import PushButton from '../components/PushButton';

const LoadProduct = () => (
  <p>正在載入產品</p>
);

class ProductContainer extends Component {
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
    if (count === 0) return dispatch(addLightBoxMessage('請選擇選購數量'));
    return dispatch(addToCartRequest(product, count));
  }
  renderAside(product) {
    const {
      dispatch,
    } = this.props;
    const {
      price,
      inventory,
    } = product;

    const CounterWithMax = ({ innerRef }) => (
      <Counter
        max={inventory}
        ref={innerRef}
        maxClick={() => { dispatch(addLightBoxMessage('此商品庫存不足')); }}
      />
    );

    return (
      <aside className="col-4">
        <h3>
          <span className="sub-title">售價:</span>
          <strong className="text-danger">{`$${price}`}</strong>
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
        <PushButton
          className="btn btn-outline-info w-100 mb-2"
          path="/"
          text="繼續選購"
        />
      </aside>
    );
  }
  renderOther(product) {
    const { products } = this.props;
    const { id } = product;
    const otherProducts = products.filter(item => item.id !== id);
    const renderList = getRandomItem(otherProducts, 12);
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
    if (!product) return <NotFound />;
    return (
      <React.Fragment>
        <ProductInfo product={product} />
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
