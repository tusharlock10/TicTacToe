import React, {Component} from 'react';
import {
  PlayedAction,
  ClearGridAction,
  ChangeThemeAction,
  ChangeHeaderColorAction,
} from '../actions';
import changeNavBarColor from 'react-native-navigation-bar-color';
import {
  View,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  Text,
  StatusBar,
  Vibration,
} from 'react-native';
import {connect} from 'react-redux';
import Image from 'react-native-fast-image';
import ShadowView from 'react-native-simple-shadow-view';
import Piece from './Piece';
import ClearButton from './ClearButton';
import ShareButton from './ShareButton';
import RatingButton from './RatingButton';
import {
  DARK_THEME_IMAGES,
  LIGHT_THEME_IMAGES,
  O_INFO_IMAGE,
  X_INFO_IMAGE,
  DARK_O_INFO_IMAGE,
  DARK_X_INFO_IMAGE,
  DARK_COLOR,
  LIGHT_COLOR,
  DRAW,
  DARK_DRAW,
  DARK_COLOR_HEADER_TEXT,
  LIGHT_COLOR_HEADER_TEXT,
} from './Static';
import ThemeButton from './ThemeButton';

const screenWidth = Dimensions.get('window').width;
const pieceWidth = Math.round((screenWidth - 50) / 3);
const borderRadius = Math.round(pieceWidth / 2.5);

class Grid extends Component {
  constructor() {
    super();
    // this.state={
    //     fontLoaded: false
    // }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  // async componentDidMount(){
  //     await Font.loadAsync({
  //         'Gotham-Black':require('../../assets/fonts/Gotham-Black.ttf')
  //     })

  //     this.setState({fontLoaded:true})
  // }

  componentWillUpdate() {
    const CustomLayoutSpring = {
      duration: 750,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 1,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1,
      },
    };

    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  Play(index) {
    Vibration.vibrate([0, 15, 0]);
    this.props.PlayedAction(index);
  }

  getImage(index) {
    if (this.props.theme === 'dark') {
      return DARK_THEME_IMAGES[index];
    } else {
      return LIGHT_THEME_IMAGES[index];
    }
  }

  getRow(indexList) {
    const {gridState} = this.props;

    return (
      <View
        style={{
          flex: 1,
          width: screenWidth,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <Piece
          image={this.getImage(gridState[indexList[0]])}
          height={pieceWidth}
          borderRadius={borderRadius}
          onPress={this.Play.bind(this, indexList[0])}
        />

        <Piece
          image={this.getImage(gridState[indexList[1]])}
          height={pieceWidth}
          borderRadius={borderRadius}
          onPress={this.Play.bind(this, indexList[1])}
        />

        <Piece
          image={this.getImage(gridState[indexList[2]])}
          height={pieceWidth}
          borderRadius={borderRadius}
          onPress={this.Play.bind(this, indexList[2])}
        />
      </View>
    );
  }

  clearGrid() {
    Vibration.vibrate([0, 20, 0]);
    this.props.ClearGridAction();
  }

  renderClearButton() {
    if (this.props.won) {
      return (
        <ClearButton
          onPress={this.clearGrid.bind(this)}
          theme={this.props.theme}
        />
      );
    } else {
      return <View />;
    }
  }

  renderShareButton() {
    return <ShareButton theme={this.props.theme} />;
  }

  renderRatingButton() {
    return <RatingButton theme={this.props.theme} />;
  }

  changeTheme() {
    this.props.ChangeThemeAction();
  }

  getPlayerImage() {
    let source = X_INFO_IMAGE;
    if (this.props.theme === 'dark') {
      source = DARK_X_INFO_IMAGE;
    }

    if (this.props.player === 'X') {
      source = O_INFO_IMAGE;
      if (this.props.theme === 'dark') {
        source = DARK_O_INFO_IMAGE;
      }
    }

    if (this.props.won) {
      if (this.props.won === 'draw') {
        source = DRAW;
        Vibration.vibrate([
          0,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
          15,
          10,
        ]);
        if (this.props.theme === 'dark') {
          source = DARK_DRAW;
        }
      } else {
        Vibration.vibrate([0, 100, 50, 100, 50, 100, 50]);
      }
    }

    return <Image source={source} style={{height: 50, width: 50}} />;
  }

  getInfoText() {
    let text = 'NEXT';
    let color = DARK_COLOR;
    let fontSize = 20;

    if (this.props.won) {
      text = 'WON';
      fontSize = 30;

      if (this.props.won === 'draw') {
        text = 'DRAW';
        fontSize = 34;
        imageHidden = true;
      }
    }

    if (this.props.theme === 'dark') {
      color = LIGHT_COLOR;
    }
    return (
      <Text style={[styles.TextStyling, {color: color, fontSize: fontSize}]}>
        {text}
      </Text>
    );
  }

  info() {
    // if (this.state.fontLoaded){
    let color = LIGHT_COLOR_HEADER_TEXT;
    if (this.props.theme === 'dark') {
      color = DARK_COLOR_HEADER_TEXT;
    }
    return (
      <ShadowView
        style={{
          shadowOpacity: 0.35,
          shadowRadius: 4,
          shadowOffset: {width: 0, height: 3},
          backgroundColor: color,
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingVertical: 5,
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}>
        {this.getPlayerImage()}

        {this.getInfoText()}
      </ShadowView>
    );
    // }
    // return <View/>
  }

  getStatusBarColor() {
    if (this.props.theme === 'light') {
      return (
        <StatusBar backgroundColor={LIGHT_COLOR} barStyle="dark-content" />
      );
    }
    return <StatusBar backgroundColor={DARK_COLOR} barStyle="light-content" />;
  }

  renderGrid() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: this.props.backgroundColor,
        }}>
        {changeNavBarColor(
          this.props.backgroundColor,
          this.props.theme === 'dark',
          false,
        )}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <ThemeButton
              onPress={this.changeTheme.bind(this)}
              theme={this.props.theme}
            />
          </View>

          <View style={{flex: 1.5, alignItems: 'center', marginRight: 10}}>
            {this.info()}
          </View>
        </View>

        <View style={{flex: 3.1}}>
          {this.getRow([0, 1, 2])}
          {this.getRow([3, 4, 5])}
          {this.getRow([6, 7, 8])}
        </View>

        <View
          style={{
            flex: 1,
            width: screenWidth,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 55,
          }}>
          {this.renderShareButton()}
          {this.renderClearButton()}
          {this.renderRatingButton()}
        </View>
      </View>
    );
  }
  render() {
    this.props.ChangeHeaderColorAction(this.props.theme);
    return (
      <View style={{flex: 1}}>
        {this.getStatusBarColor()}
        {this.renderGrid()}
      </View>
    );
  }
}

const styles = {
  TextStyling: {
    fontFamily: 'Gotham-Black',
  },
};

const mapStateToProps = state => {
  return {
    player: state.grid.player,
    gridState: state.grid.gridState,
    won: state.grid.won,
    theme: state.theme.theme,
    backgroundColor: state.theme.backgroundColor,
  };
};

export default connect(mapStateToProps, {
  PlayedAction,
  ClearGridAction,
  ChangeThemeAction,
  ChangeHeaderColorAction,
})(Grid);
