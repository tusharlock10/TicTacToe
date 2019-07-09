import React, {Component} from 'react';
import {
    PlayedAction,
    ClearGridAction,
    ChangeThemeAction,
    ChangeHeaderColorAction,
    
} from '../actions'
import {
    View, 
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform,
    Text,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import * as Font from 'expo-font'

import Piece from './Piece';
import ClearButton from './ClearButton';
import { 
    DARK_THEME_IMAGES, 
    LIGHT_THEME_IMAGES, 
    O_INFO_IMAGE, 
    X_INFO_IMAGE,
    DARK_O_INFO_IMAGE, 
    DARK_X_INFO_IMAGE,
 } from './Static'
import ThemeButton from './ThemeButton';


class Grid extends Component{
    constructor(){
        super();
        this.state={
            fontLoaded: false
        }

        if (Platform.OS === 'android') {
            (UIManager.setLayoutAnimationEnabledExperimental 
            && 
            UIManager.setLayoutAnimationEnabledExperimental(true));
          }
    }

    async componentDidMount(){
        await Font.loadAsync({
            'Gotham-Black':require('../../assets/fonts/Gotham-Black.ttf')
        })

        this.setState({fontLoaded:true})
    }

    componentWillUpdate(){
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


    Play(index){
        
        this.props.PlayedAction(index)
        
    }

    getImage(index){
        if (this.props.theme === 'dark'){
            return DARK_THEME_IMAGES[index]
        }
        else{
            return LIGHT_THEME_IMAGES[index]
        }
        

    }
    

    getRow(indexList){
        const screenWidth = Dimensions.get('window').width
        // indexList = [0, 1, 2] for eg.
        const {gridState} = this.props

        return (
            <View style={{flex:1, width:screenWidth, justifyContent:'space-around',
            alignItems:'center', flexDirection:'row'}}>

                <Piece image={ this.getImage(gridState[indexList[0]]) }
                height={110}
                onPress={this.Play.bind(this, indexList[0])}/>

                <Piece image={ this.getImage(gridState[indexList[1]]) }
                height={110}
                onPress={this.Play.bind(this, indexList[1])}/>

                <Piece image={ this.getImage(gridState[indexList[2]]) }
                height={110}
                onPress={this.Play.bind(this, indexList[2])}/>

            </View>
        )
    }

    clearGrid(){
        this.props.ClearGridAction()
    }

    renderClearButton(){
        if (this.props.won){
            return <ClearButton onPress={this.clearGrid.bind(this)} theme={this.props.theme}/>
        }
        else{
            return <View/>
        }
    }

    changeTheme(){
        this.props.ChangeThemeAction()
        
    }

    getInfoImage(){
        var source = X_INFO_IMAGE;
        if (this.props.theme==='dark'){
            source = DARK_X_INFO_IMAGE
        }

        if (this.props.player==='X'){
            source = O_INFO_IMAGE
            if (this.props.theme==='dark'){
                source = DARK_O_INFO_IMAGE
            }
        }

        return (
            <Image source={source} style={{height:50, width:50}}/>
        )

    }

    infoText(){
        if (this.state.fontLoaded){
        return (
            <View style={{flex:1, justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                {this.getInfoImage()}
                <Text style={styles.TextStyling}>
                's Turn
                </Text>
            </View>)
        }
        return <View/>
    }
    

    renderGrid(){
        return (
        <View
        style={{justifyContent:'center', alignItems:'center', flex:1 ,
         backgroundColor:this.props.backgroundColor}}>

            <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <ThemeButton onPress={this.changeTheme.bind(this)} theme={this.props.theme} />
                </View>

                <View style={{flex:1.5, alignItems:'center'}}>
                    {this.infoText()}
                </View>
            </View>

            <View style={{flex:3.1}}>
                {this.getRow([0, 1, 2])}
                {this.getRow([3, 4, 5])}
                {this.getRow([6, 7, 8])}
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                {this.renderClearButton()}
            </View>
 
        </View>
        )
    }
    render(){
        this.props.ChangeHeaderColorAction(this.props.theme)

        
        return (
        
            <View style={{flex:1}}>
                {this.renderGrid()}
            </View>
        )
    }

}

const styles={
    TextStyling:{
        fontSize:34,
        color:"rgb(255,0,0)",
        fontFamily:"Gotham-Black"
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.grid.player,
        gridState: state.grid.gridState,
        won: state.grid.won,
        theme: state.theme.theme,
        backgroundColor: state.theme.backgroundColor
    }
}

export default connect( mapStateToProps, {
    PlayedAction,
    ClearGridAction,
    ChangeThemeAction,
    ChangeHeaderColorAction
})(Grid);