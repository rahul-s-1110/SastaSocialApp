import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../Component/button';
import {colors} from '../Constant/colors';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addPost} from '../redux/postReducer';

const AddNewPost = () => {
  const [description, setDescription] = useState('');
  const [showList, setShowList] = useState(false);
  const [taggedUsers, setTaggedusers] = useState([]);
  const [untagUser, setUnTagUser] = useState([]);
  const [imgPath, setImgPath] = useState([]);

  const ListUser = useSelector(state => state.follow.following);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUnTagUser(ListUser);
  }, [ListUser]);

  const cancel = () => {
    setUnTagUser(ListUser);
    setTaggedusers([]);
    navigation.goBack();
  };

  const addAPost = () => {
    const data = {
      img: imgPath,
      tag: taggedUsers,
      desc: description,
      like: false,
      numOfLike: 0,
      postId: Math.random().toString(16).slice(2),
    };
    dispatch(addPost(data));
    Alert.alert('Alert Title', 'Post Successfully Added', [
      {
        text: 'OK',
        onPress: () => {
          setUnTagUser(ListUser);
          setTaggedusers([]);
          setDescription('');
          navigation.goBack();
        },
      },
    ]);
  };

  const toogleUser = data => {
    let newData = untagUser.filter(item => item != data);
    setUnTagUser(newData);
    let newUser = [];
    newUser.push(data);
    newUser = newUser.concat(taggedUsers);
    const newText =
      description.slice(0, description.lastIndexOf('@')) +
      ' ' +
      data?.name +
      ' ';
    setDescription(newText);
    setTaggedusers(newUser);
    setShowList(false);
  };

  const handleTextChange = e => {
    setDescription(e);
    if (e.slice(-1) == '@') {
      setShowList(true);
    } else {
      setDescription(e);
    }
  };



   const removeImg =  (index) =>{
    let newImg = imgPath;
    newImg.splice(index,1);
    setImgPath(newImg);
   }

  const handleBackspace = key => {
    // Backspace handling
  };

  const addImg = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      if (images.length > 4) {
        Alert.alert('You can select only max 4 Files');
      } else {
        setImgPath(images);
        // let allImg = []
        //     images.forEach((item)=>{
        //     let image = {
        //         uri: item.path,
        //       }
        //       allImg.push(image)
        //       setImgPath(allImg)
        // })
      }
    });
  };

  return (
    <SafeAreaView style={{paddingTop: 10}}>
      <View style={{paddingHorizontal: 18}}>
        <Text style={styles.craetePostBtn}>Create Post</Text>
        <Text style={{alignSelf: 'center', marginTop: 15}}>Description</Text>
      </View>
      <TextInput
        maxLength={300}
        value={description}
        style={{height: 100, borderWidth: 1}}
        multiline
        onChangeText={handleTextChange}
        // onKeyPress={handleBackspace}
      />
      <Text onPress={addImg} style={styles.addFileBtn}>
        Add Files
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <FlatList
          horizontal
          style={{paddingTop: 5}}
          data={imgPath}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) => (
            <View style={{padding: 5, backgroundColor: '#f7faf8',borderRadius:5}}>
              <ImageBackground
                resizeMode="contain"
                style={styles.img}
                source={{uri: item?.path}}>
                <Pressable onPress={()=>removeImg(index)}>
                  <AntDesign
                    name="closecircle"
                    size={20}
                    color={colors.gray}
                  />
                </Pressable>
              </ImageBackground>
            </View>
          )}
          ItemSeparatorComponent={<View style={{width: 15}} />}
          ListFooterComponent={<View style={{paddingRight: 15}} />}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 18,
        }}>
        <Text
          onPress={cancel}
          style={[styles.addFileBtn, {backgroundColor: colors.orange}]}>
          Cancel
        </Text>
        <Text
          onPress={addAPost}
          style={[styles.addFileBtn, {backgroundColor: colors.blue}]}>
          Done
        </Text>
      </View>
      {showList &&
        untagUser.map(item => (
          <Text onPress={() => toogleUser(item)} style={styles.tagUserList}>
            {item?.name}
          </Text>
        ))}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  addFileBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: colors.gray,
    marginTop: 15,
    color: colors.white,
  },
  craetePostBtn: {
    textAlign: 'center',
    paddingVertical: 6,
    backgroundColor: colors.gray,
    borderRadius: 10,
    color: colors.white,
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  tagUserList: {
    paddingLeft: 15,
    paddingVertical: 10,
    marginVertical: 2,
    backgroundColor: colors.gray,
  },
});

export default AddNewPost;
