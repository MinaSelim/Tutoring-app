import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 20,
  },
  userTitleContainer: {
    paddingTop: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 27,
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
    marginBottom: 20,
    marginTop: 20,
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
