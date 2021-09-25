import React, {useState} from 'react';
import {Button, Image, TextInput, View} from "react-native";
import firebase from "firebase";

/*Uploding the image to firebase storage*/
function SaveFile(props) {
    const [caption, setCaption] = useState("");

    function savePostData(downloadLink) {
        firebase.firestore().collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection('user_posts')
            .add({
                downloadLink,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(()=> {
                /*This will redirect to the main component with the upload*/
                props.navigation.popToTop()
        })
        
    }

    const uploadImageToFirebase =async ()  =>{
        /*Sending an async request to firestore
        * and saving the data*/
        const reposnse = await fetch(props.route.params.image);
        const blob = await reposnse.blob();

        const task = firebase
            .storage()
            .ref(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
            .put(blob);

        /*In order capture the progress this is done*/
        const currentTaskProgress = snapshot => {
            console.log(`Transfering progress: ${snapshot.bytesTransferred}`)
        }

        const taskIsCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                /*Save as an post*/
                savePostData(snapshot);
                console.log(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log('Error Occured',snapshot)
        }

        /*Binding the defined Methods to the task Instance*/
        task.on("state_changed",currentTaskProgress,taskError, taskIsCompleted   );

    }

    return (
        <View stype={{flex:1}}>
            <Image source={{uri: props.route.params.image}} />
            <TextInput
                placeholder = "Enter a description"
                onChangeText={(caption)=> setCaption(caption)}
            />

            <Button title={"Save"} onPress = {()=> uploadImageToFirebase()}/>
        </View>
    );
}

export default SaveFile;