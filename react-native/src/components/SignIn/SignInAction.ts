import {connect} from 'react-redux';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
    inputUsername: state.SignInReducer.inputUsername,
    inputPassword: state.SignInReducer.inputPassword
});

export default connect(mapStateToProps)(SignIn);