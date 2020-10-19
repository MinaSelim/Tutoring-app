import {connect} from 'react-redux';
import SignUp2 from './SignUp2';

const mapStateToProps = (state) => ({
    userType: state.SignUp2Reducer.userType
});

export default connect(mapStateToProps)(SignUp2);