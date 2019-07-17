import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeData } from '../../actions/general/general';
import MainPage from '../../pages/Main';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ initializeData }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
