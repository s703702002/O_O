import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import {
  getProductRequset,
  getProductsRequest,
} from '../action';

const dataImg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22980%22%20height%3D%22270%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20980%20270%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1651ec9a4f5%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A49pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1651ec9a4f5%22%3E%3Crect%20width%3D%22980%22%20height%3D%22270%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22364.671875%22%20y%3D%22156.9%22%3E980x270%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const LoadProduct = () => (
  <p>正在載入產品</p>
);
class ProductContainer extends Component {
  componentDidMount() {
    const {
      dispatch,
      products,
    } = this.props;
    const { productId } = this.props.match.params;
    dispatch(getProductRequset(productId));
    if (!products.length) dispatch(getProductsRequest());
  }
  renderProduct() {
    const {
      title,
    } = this.props.product;
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
  renderAside() {
    const {
      price,
      inventory,
    } = this.props.product;
    return (
      <aside className="col-4">
        <h3><strong>{`$${price}`}</strong></h3>
        <p>
          庫存{inventory}
        </p>
        <button
          className="btn btn-outline-primary w-100 mb-2"
        >
          加入購物車
        </button>
        <button
          className="btn btn-outline-secondary  w-100"
        >
          繼續選購
        </button>
      </aside>
    );
  }
  renderOther() {
    const { products } = this.props;
    return (
      <section className="col-12">
        <h4>其他商品</h4>
      </section>
    );
  }
  renderContent() {
    return (
      <React.Fragment>
        {
          this.renderProduct()
        }
        {
          this.renderAside()
        }
        {
          this.renderOther()
        }
      </React.Fragment>
    );
  }
  render() {
    const {
      id,
    } = this.props.product;
    return (
      <div className="container">
        <div className="row">
          {
            !id
            ? <LoadProduct />
            : this.renderContent()
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products } = state.products;
  const { product } = state.productPage;
  return {
    product,
    products,
  };
};

export default withRouter(connect(mapStateToProps)(ProductContainer));
