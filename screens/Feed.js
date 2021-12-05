import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import firebase from "firebase"

import FactCard from './FactCard';

//let stories = require("../temp.json");

export default class FeedScreen extends React.Component{
constructor(){
  super()
  this.state={
    stories:[]
  }
}

componentDidMount(){
  this.fetchFacts()
}

fetchFacts=()=>{
  firebase
  .database()
  .ref("/posts/")
  .on(
    "value",
    snapshot => {
      let stories = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach(function (key) {
          stories.push({
            key: key,
            value: snapshot.val()[key]
          });
        });
      }
      this.setState({ stories: stories });
    })
  };

keyExtractor=(item,index)=>{
  index.toString()
}

renderItem=({item})=>{
  return <FactCard story={item} navigation={this.props.navigation}/>
}

render() {
  return (
    <View style={styles.container}>
      <View>
        <FlatList
         keyExtractor={this.keyExtractor}
         data={this.state.stories}
         renderItem={this.renderItem}
        />
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#3ecf65"
   },
})