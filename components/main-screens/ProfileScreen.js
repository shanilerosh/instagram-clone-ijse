import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";


function ProfileScreen(props) {
    const {currUser, posts} = props;
    console.log('Curre USer==>', currUser)
    const temp=[
        {
            id :  1,
            content : 'Hi there this is my passion',
            contentImageUri : 'https://picsum.photos/700',
            user : {
                id : 'u001',
                name : 'chathu Resha',
                imageUri : 'https://static.toiimg.com/photo/msid-77231202/77231202.jpg?243423',
            },
        },
        {
            id :  2,
            content : 'Hi there this is my passion',
            contentImageUri : 'https://picsum.photos/700',
            user : {
                id: 'u002',
                name : 'Ashen',
                imageUri :  'https://static.toiimg.com/photo/msid-77231202/77231202.jpg?243423'
            },
        }, {
            id :  3,
            content : 'Hi there this is my passion',
            contentImageUri : 'https://picsum.photos/700',
            user : {
                id: 'u003',
                name : 'akila',
                imageUri :  'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/05/Whatsapp-Profile-Images-wallpaper-hd-300x300.gif'
            },
        },
    ]



    return (
        <View style={styles.container}>
            <View style={styles.containerWithInfo}>
                {currUser ?
                    <>
                    <Text>{currUser.name}</Text>
                    <Text>{currUser.email}</Text>
                    </> : ''
                }
            </View>

            <View style={styles.containerWithImages}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({item})=> {
                        return <Image source={{uri:item.downloadLink} }
                                       style={styles.imageStyle} />
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    containerWithInfo: {
        margin: 8
    },
    containerWithImages: {
        flex:1/3
    },
    imageStyle: {
        width: 300,
        height: 400,
        aspectRatio: 1
    }
})


/*Mapping the global state to this compopnent*/
const mapStatToProps = (store) => ({
    currUser: store.userState.currUser,
    posts: store.userState.posts,
})

export default connect(mapStatToProps, null)(ProfileScreen);