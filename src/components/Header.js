import React, {Component} from 'react';
import { View, Text} from 'react-native';
import {connect} from 'react-redux';
import * as Font from 'expo-font'

const LIGHT_COLOR = 'rgb(255,255,255)';
const DARK_COLOR = 'rgb(50,50,50)'


class Header extends Component{
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

    getColors(){
        if (this.props.theme==='dark'){
            return {textColor:LIGHT_COLOR, color:DARK_COLOR}
        }
        return {textColor:DARK_COLOR, color:LIGHT_COLOR}
    }
    
    getText(textColor){
        if (this.state.fontLoaded){
            
            return (
                <Text style={[styles.TextStyling, {color:textColor}]}>
                    TIC TAC TOE
                </Text>
            )
        }

        return <View/>
    }
    
    render(){
        const {textColor, color} = this.getColors()
        return (
        <View style={[styles.HeaderStyling, {backgroundColor:color}]}>
            {this.getText(textColor)}
        </View>
    )}
}

const styles={
    HeaderStyling:{
        width:null,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        elevation:20,

    },
    TextStyling:{
        top:10,
        fontSize:36,
        fontFamily:'Gotham-Black',
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
    }
}

export default connect(mapStateToProps, {})(Header);