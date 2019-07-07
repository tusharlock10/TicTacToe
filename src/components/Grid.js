import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {connect} from 'react-redux'
import * as Font from 'expo-font'
import {
    PlayedAction,
    ClearGridAction,
    ChangeThemeAction,
    ChangeHeaderColorAction
} from '../actions'
import Piece from './Piece';
import ClearButton from './ClearButton';
import { DARK_THEME_IMAGES, LIGHT_THEME_IMAGES } from './Static'
import ThemeButton from './ThemeButton';


class Grid extends Component{
    constructor(){
        super();
        this.state={
            fontLoaded: false
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
            'Gotham-Black':require('../../assets/fonts/Gotham-Black.ttf')
        })

        this.setState({fontLoaded:true})
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
            return <ClearButton onPress={this.clearGrid.bind(this)}/>
        }
        else{
            return <View/>
        }
    }

    changeTheme(){
        this.props.ChangeThemeAction()
        
    }

    infoText(){
        if (this.state.fontLoaded){
        return (
            <Text style={styles.TextStyling}>
                <Text>{this.props.player}</Text>
            </Text>)
        }
        return <View/>
    }
    

    renderGrid(){
        return (
        <View
        style={{justifyContent:'center', alignItems:'center', flex:1 ,
         backgroundColor:this.props.backgroundColor}}>

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ThemeButton onPress={this.changeTheme.bind(this)} theme={this.props.theme} />
                {this.infoText()}
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
        fontSize:20,
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