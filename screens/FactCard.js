import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id:this.props.story.key,
      story_data:this.props.story.value,
      is_favorite:false,
      is_liked:false,
      likes:0,
      favorite:""
    };
  }

  
  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };
  

  favorite=()=>{
    if(this.state.is_favorite){
      firebase
      .database()
      .ref("posts")
      .child(this.state.story_id)
      .child("favorite")
      .set("no")
      this.setState({is_favorite:false})
      this.setState({favorite:""})
    }else{
      firebase
      .database()
      .ref("posts")
      .child(this.state.story_id)
      .child("favorite")
      .set("yes")
      this.setState({is_favorite:true})
      this.setState({favorite:this.state.story_id})
      if(this.state.favorite){
        firebase
        .database()
        .ref("favorites")
        .set({
          favorite:this.state.favorite
        })
      }
    }
  }


  render() {
      return (
        <View>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
            <Text
                style={styles.storyTitleText}>
                {this.state.story_data.title}
              </Text>
              <Text
                style={styles.storyAuthorText}>
                {this.state.story_data.name}
              </Text>
              <Text
                style={styles.descriptionText}>
                {this.state.story_data.facts}
              </Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                 style={styles.likeButton}
                 onPress={()=>this.likeAction()}
                >
                  <Text style={styles.likeText}>{this.state.likes} like</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.likeButton}
                 onPress={()=>this.favorite()}
                >
                  <Text style={styles.likeText}>{this.state.favorite}favorite</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }




const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#237539",
    borderRadius: RFValue(20),
    height:RFValue(200)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  storyTitleText: {
   
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
    marginTop:20,
    fontSize: RFValue(18),
    color: "white"
  },
  descriptionContainer: {
    marginTop:20,
    marginTop: RFValue(5)
  },
  descriptionText: {
    marginTop:20,
    fontSize: RFValue(13),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
    flexDirection:"row",
    margin:20,
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
});
