import React, {Component} from 'react';
import { View, Text} from 'react-native';
import {connect} from 'react-redux';
import * as Font from 'expo-font'
import {DARK_COLOR, LIGHT_COLOR} from './Static'


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
        fontSize:42,
        fontFamily:'Gotham-Black',
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
    }
}

export default connect(mapStateToProps, {})(Header);