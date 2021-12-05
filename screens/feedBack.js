import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import firebase from "firebase"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FeedBack extends React.Component{
constructor(){
    super()
    this.state={
       feedback:""
    }
}
 
sendFeedBack=()=>{
  if(this.state.feedback){
  firebase
  .firestore()
  .collection("feedback")
  .doc(firebase.auth().currentUser.uid)
  .set({
    sender:firebase.auth().currentUser.displayName,
    feedback:this.state.feedback
  })
 }else{
   alert('plz enter some thing')
 }
}

render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FeedBack</Text>
      <View>
          <TextInput
           style={styles.inputStyle}
           onChangeText={(text)=>this.setState({feedback:text})}
           placeholder={"add feedback"}
           placeholderTextColor={"white"}
           multiline={false}
           color={"white"}
           numberOfLines={5}
          />
      </View>
      <View>
          <TouchableOpacity
           style={styles.bottonStyle}
           onPress={()=>this.sendFeedBack()}
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
    backgroundColor:"#1C7947",
    flex:1
  },
  inputStyle:{
    borderWidth:2,
    borderRadius:5,
    borderColor:"white",
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