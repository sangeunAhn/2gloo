import React, {Component} from 'react';
import ClubDiv from './presenter';
import * as axios from 'axios';
import PropTypes from 'prop-types';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubNo: [],
      clubName: [],
      clubLogo: [],
      clubMainPicture: [],
    };
    {
      this.props.navigation.addListener('didFocus', async () => {
        if (
          this.props.navigation.getParam('from', 'NO-ID') === 'makeRecord' ||
          this.props.navigation.getParam('from', 'NO-ID') === 'updateClub'
        ) {
          await this.setState({
            clubNo: [],
            clubName: [],
            clubLogo: [],
            clubMainPicture: [],
          });
          this._getDatas();
        }
      });
    }
  }
  static propTypes = {
    school: PropTypes.string.isRequired,
  };
  componentWillMount() {
    this._getDatas();
  }

  render() {
    return <ClubDiv {...this.state} {...this.props} />;
  }

  _getDatas = async () => {
    const {clubNo, clubName, clubLogo, clubMainPicture} = this.state;
    const {school, clubKind} = this.props;
    this.setState({school});

    // 데이터 가져오기
    await axios
      .post('http://13.209.221.206/php/Main/FindClubs.php', {
        school: school,
        clubKind: clubKind,
      })
      .then(result => {
        const response = result.data;
        var clubNoArray = new Array();
        var clubNameArray = new Array();
        var clubLogoArray = new Array();
        var clubMainPictureArray = new Array();

        response.forEach(row => {
          clubNoArray.push(row.clubNo);
          clubNameArray.push(row.clubName);
          clubLogoArray.push(row.clubLogo_low);
          clubMainPictureArray.push(row.clubMainPicture_low);
        });

        this.setState({
          clubNo: clubNo.concat(clubNoArray),
          clubName: clubName.concat(clubNameArray),
          clubLogo: clubLogo.concat(clubLogoArray),
          clubMainPicture: clubMainPicture.concat(clubMainPictureArray),
        });
      });
  };
}

export default Container;
