import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setProduct } from '../../actions/product/product';
import ShoppingCartPage from '../../pages/shoppingCart';

const mapStateToProps = (state) => ({
  checkout: state.checkout.checkout,
  loadingCheckout: state.checkout.loading,
  loadingRules: state.pricingRules.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setProduct }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingCartPage);
