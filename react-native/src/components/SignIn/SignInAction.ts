import {connect} from 'react-redux';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
    inputEmail: state.SignInReducer.inputEmail,
    inputPassword: state.SignInReducer.inputPassword
});

export default connect(mapStateToProps)(SignIn);