import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShoppingCartPage from '../../pages/shoppingCart';
import { initializeData } from '../../actions/general/general';

const mapStateToProps = (state) => ({
  checkout: state.checkout.checkout,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      initializeData,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingCartPage);
