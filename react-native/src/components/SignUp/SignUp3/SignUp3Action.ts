import {connect} from 'react-redux';
import SignUp3 from './SignUp3';

const mapStateToProps = (state) => ({
    university: state.SignUp3Reducer.university
});

export default connect(mapStateToProps)(SignUp3);