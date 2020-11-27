import {connect} from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {
  return {
    firstName: state.SignInReducer.firstName,
  };
};

export default connect(mapStateToProps)(Home);
