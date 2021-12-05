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
  RecyclerViewBackedScrollViewBase
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";


export default class LoginScreen extends Component {

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      // Check if we are already signed-in Firebase with the correct user.
    
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result)=>{
              firebase
              .firestore()
              .collection('user')
              .doc(firebase.auth().currentUser.uid)
              .get()
              .then(doc=>{
                if(doc.exists){
                  return result
                }else{
                 this.addNewUserToFirestore(result)
                }
              })

          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

  addNewUserToFirestore(user) {
    const collection = firebase.firestore().collection('user');
    const {profile} = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return {user, details};
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
          "162557795368-62mbdnvfq9g6g839see1p5dve099n2kg.apps.googleusercontent.com",
        iosClientId:
          "162557795368-pkqps88f3i70vv3p6v5i9bm657dplo18.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Text style={styles.appTitleText}>{`GeneralKnowledge\nApp`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3ecf65"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 1220
  },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    resizeMode: "contain"
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    width:200,
    height:100,
    borderRadius:20
  },
  googleIcon: {
   
    resizeMode: "contain"
  },
  googleText: {
    color: "black",
    
  },
  cloudContainer: {
    flex: 0.3
  },
  cloudImage: {
    position: "absolute",
    width: "100%",
    resizeMode: "contain",
    
  }
});
