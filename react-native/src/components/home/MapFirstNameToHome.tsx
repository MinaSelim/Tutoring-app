import {connect} from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
  };
};
export default connect(mapStateToProps)(Home);
