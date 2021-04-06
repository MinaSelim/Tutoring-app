import {StyleSheet} from 'react-native';

export const TutorProfileStyles = StyleSheet.create({
  modal: {
    flex: 1,
    width: '98%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    marginTop: '2%',
    borderRadius: 18,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: 'space-between',
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  ProfileHeader: {
    flexDirection: 'row',
    borderRadius: 18,
    height: '12%',
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: '#363636',
    fontWeight: 'bold',
  },
  cardName: {
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  profilePicture: {
    borderColor: 'black',
    width: 88,
    height: 88,
    marginLeft: '8%',
  },
  safeArea: {
    flex: 1,
  },
  navButtons: {
    marginHorizontal: 20,
    marginBottom: 5,
    paddingVertical: 18,
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
  cardAvatar: {
    height: 75,
    width: 75,
  },
  profileRating: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomCard: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  tutorInfo: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  profileAvatarContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  reviewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
  },
});

export default TutorProfileStyles;
