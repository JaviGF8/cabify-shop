import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProduct, getProduct, setProduct } from '../../actions/product/product';
import ProductDetailPage from '../../pages/productDetail';

const mapStateToProps = (state) => ({
  product: state.product.product,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addProduct, getProduct, setProduct }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailPage);
