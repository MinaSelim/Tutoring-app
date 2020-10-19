import {connect} from 'react-redux';
import SignUp1 from './SignUp1';

const mapStateToProps = (state) => ({
    firstName: state.SignUp1Reducer.firstName,
    lastName: state.SignUp1Reducer.lastName,
    email: state.SignUp1Reducer.email,
    phone: state.SignUp1Reducer.phone,
    password: state.SignUp1Reducer.password
});

export default connect(mapStateToProps)(SignUp1);