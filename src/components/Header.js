import React, {Component} from 'react';
import { View, Text} from 'react-native';
import {connect} from 'react-redux';
// import * as Font from 'expo-font'
import ShadowView from 'react-native-simple-shadow-view'
import {
    DARK_COLOR, 
    LIGHT_COLOR, 
    BOLD_BLUE,
    BOLD_RED,
    BOLD_GREEN,
    DARK_COLOR_HEADER_TEXT,
    LIGHT_COLOR_HEADER_TEXT
} from './Static'


class Header extends Component{
    constructor(){

        super();
        // this.state={
        //     fontLoaded: false
        // }
    }

    // async componentDidMount(){
    //     await Font.loadAsync({
    //         'Gotham-Black':require('../../assets/fonts/Gotham-Black.ttf')
    //     })

    //     this.setState({fontLoaded:true})
    // }

    getColors(){
        if (this.props.theme==='dark'){
            return {
                textColor:[LIGHT_COLOR, LIGHT_COLOR, LIGHT_COLOR],
                headerColor:DARK_COLOR,
                color:DARK_COLOR_HEADER_TEXT,
            }
        }
        return {
            textColor:[BOLD_BLUE, BOLD_RED, BOLD_GREEN], 
            headerColor:LIGHT_COLOR,
            color:LIGHT_COLOR_HEADER_TEXT,
        }
    }
    
    getText(colorObj){
        // if (this.state.fontLoaded){
        const {textColor, color} = colorObj;

            
        return (
            <ShadowView style={{
                shadowOpacity: 0.35,
                shadowRadius:4,
                shadowOffset: { width: 0, height: 3},
                backgroundColor: color,
                paddingVertical:5,
                paddingHorizontal:20,
                borderRadius:10
            }}>
                <Text style={styles.TextStyling}>
                    <Text style={{color:textColor[0]}}>{'TIC '}</Text>
                    <Text style={{color:textColor[1]}}>{'TAC '}</Text>
                    <Text style={{color:textColor[2]}}>{'TOE'}</Text>
                </Text>
            </ShadowView>
        )
        // }
        // return <View/>
    }
    
    render(){
        const colorObj = this.getColors()
        return (
        <View style={[styles.HeaderStyling, {backgroundColor:colorObj.headerColor}]}>
            {this.getText(colorObj)}
        </View>
    )}
}

const styles={
    HeaderStyling:{
        width:null,
        height:80,
        justifyContent:'center',
        alignItems:'center'
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