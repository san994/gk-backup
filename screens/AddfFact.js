import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import firebase from "firebase"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AddFactScreen extends React.Component{
constructor(){
    super()
    this.state={
        fact:"",
        like:0,
        title:''
    }
}
addFact=async()=>{
  await firebase
  .database()
  .ref(
    "/posts/" +
      Math.random()
        .toString(36)
        .slice(2)
  )
  .set({
    facts:this.state.fact,
    name:firebase.auth().currentUser.displayName,
    title:this.state.title,
    likes:0,
    favorite:""
  })
}
render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddFact</Text>
      <View>
          <TextInput
           style={styles.inputStyle}
           onChangeText={(text)=>this.setState({title:text})}
           placeholder={"add title"}
           placeholderTextColor={"white"}
           multiline={false}
           color={"white"}
           numberOfLines={5}
          />
      </View>
      <View>
          <TextInput
           style={styles.inputStyle}
           onChangeText={(text)=>this.setState({fact:text})}
           placeholder={"add fact"}
           placeholderTextColor={"white"}
           multiline={false}
           color={"white"}
           numberOfLines={5}
          />
      </View>
      <View>
          <TouchableOpacity
           style={styles.bottonStyle}
           onPress={()=>this.addFact()}
          >
          <Text style={styles.bottontextStyle}>submit</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#3ecf65",
    flex:1
  },
  inputStyle:{
    borderWidth:2,
    borderRadius:5,
    borderColor:"white",
    marginTop:20
  },
  title:{
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    
  },
  bottonStyle:{
    marginTop:20,
    backgroundColor:"white",
    width:100,
    height:50,
    paddingLeft:25,
    textAlign:"center",
    alignSelf:"center",
    justifyContent:"center",
    borderRadius:10
  },
  bottontextStyle:{
    fontSize:20,
    color:"black",
    fontWeight:"bold",
    marginRight:5
  }
})