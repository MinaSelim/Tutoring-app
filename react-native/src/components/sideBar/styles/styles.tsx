import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: '8%',
  },
  userTitleContainer: {
    paddingTop: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '6%',
  },
  avatar: {
    width: 66,
    height: 66,
  },
  button: {
    justifyContent: 'flex-start',
    fontSize: 18,
    fontWeight: '800',
  },
  divider: {
    marginBottom: '5%',
    marginTop: '5%',
  },
  termsButton: {
    alignSelf: 'center',
  },
  terms: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
});
export default styles;
