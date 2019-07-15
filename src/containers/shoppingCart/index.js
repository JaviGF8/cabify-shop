import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShoppingCartPage from '../../pages/shoppingCart';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {},
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingCartPage);
