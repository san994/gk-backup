import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

//import NetInfo from "@react-native-community/netinfo";

//import dictionary from '../databse';
//import axios from "axios";

export default class SearchScreen extends React.Component{
constructor(){
  super()
  this.state={
    text:'',
    isSearchPressed:false,
    defination:"",
    isConnetced:false,
    word:'loading...',
    lexicalCategory:""
  }
}
// componentDidMount(){
//   NetInfo.addEventListener(networkStatus=>{
//     this.setState({isConnected:networkStatus.isConnected})
//   })
// }

searchWords=async(tex)=>{
//  if(this.state.isConnetced===true){
  var searchKeyword= tex.toLowerCase()
  var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
   fetch(url)
  .then((data)=>{
    if(data.status===200){
      return data.json()
    }else{
      return null
    }
  })
  .then((responce)=>{
    if(responce){
      var wordData=responce.definitions[0];
      var definations=wordData.description;
      var lexicalCategory=wordData.wordtype;
      this.setState({
         word:this.state.text,
         defination:definations,
         lexicalCategory:lexicalCategory,
      })
    }else{
      this.setState({
        word:this.state.text,
        definations:"not found"
      })
    }
  })

// }else if(this.state.isConnetced===false){
//   var text = tex.toLowerCase()
//   try{
//            var word = dictionary[text]["word"]
//            var defination =dictionary[text]['definition']
//            var lexicalCategory = dictionary[text]['lexicalCategory']
//            this.setState({

//               word:word,
//               defination:defination,
//               lexicalCategory:lexicalCategory

//            })
//       }

//       catch(err){
//        alert("sorry we dont have this word")
//        this.setState({
//          text:"",
//        })

//       }
// }

}

render() {
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.inputBox}
        onChangeText={(text)=>this.setState({text:text})}
        placeholder={'write here'}
        placeholderTextColor={"white"}
      />
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>word: {this.state.word}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>defination: {this.state.defination}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>lexicalCategory: {this.state.lexicalCategory}</Text>
        </View>
      </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={()=>this.searchWords(this.state.text)}
        >
          <Text>search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
}


const styles=StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:"#3ecf65"
  },
  inputBox:{
   borderWidth:2,
   borderRadius:5,
   borderColor:"white",
  },
  textStyle:{
    fontSize:20,
    color:"white",
    fontWeight:"bold"
  },
  textContainer:{
    marginTop:20,
    margin:5,
  },
  buttonStyle:{
    marginTop:20,
    marginLeft:20,
    backgroundColor:"white",
    width:100,
    height:50,
    paddingLeft:25,
    textAlign:"center",
    alignSelf:"center",
    justifyContent:"center",
    borderColor:"black",
    borderRadius:10
  },
})