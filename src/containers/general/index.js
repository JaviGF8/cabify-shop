import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainPage from '../../pages/Main';

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
)(MainPage);
