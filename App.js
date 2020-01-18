import React from 'react';
import {StatusBar, Alert} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from './screen/Home/Home';
import Schools from './screen/Home/Schools';
import Schools2 from './screen/Home/Schools2';
import MakeClub from './screen/MakeClub/MakeClub';
import MakeRecord from './screen/MakeClub/MakeRecord';
import MakeChars from './screen/MakeClub/MakeChars';
import MakeRecordPictures from './screen/MakeClub/MakeRecordPictures';
import Club from './screen/Main/Club';
import ClubIntroduce from './screen/Main/ClubIntroduce';
import RecordPictures from './screen/Main/ClubRecordPictures';
import UpdateClub from './screen/MakeClub/UpdateClub';
import Login from './screen/Login/Login';
import SignUp from './screen/Login/SignUp';
import RegisterSchool from './screen/Login/RegisterSchool';
import SignUpPermission from './screen/Login/SignUpPermission';
import NoticeBoard from './screen/Main/NoticeBoard';
import {MenuProvider} from 'react-native-popup-menu';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Schools: {
      screen: Schools,
    },
    Schools2: {
      screen: Schools2,
    },
    MakeClub: {
      screen: MakeClub,
    },
    MakeRecord: {
      screen: MakeRecord,
    },
    MakeChars: {
      screen: MakeChars,
    },
    MakeRecordPictures: {
      screen: MakeRecordPictures,
    },
    Club: {
      screen: Club,
    },
    ClubIntroduce: {
      screen: ClubIntroduce,
    },
    RecordPictures: {
      screen: RecordPictures,
    },
    UpdateClub: {
      screen: UpdateClub,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    SignUpPermission: {
      screen: SignUpPermission,
    },
    RegisterSchool: {
      screen: RegisterSchool,
    },
    NoticeBoard: {
      screen: NoticeBoard
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <>
        <MenuProvider>
          <AppContainer />
          <StatusBar
            barStyle="dark-content"
            // dark-content, light-content and default
            hidden={false}
            //To hide statusBar
            backgroundColor="transparent"
            //Background color of statusBar only works for Android
            translucent={false}
            //allowing light, but not detailed shapes
            networkActivityIndicatorVisible={true}
          />
        </MenuProvider>
      </>
    );
  }
}
