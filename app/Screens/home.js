import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../Component/button';
import {users} from '../Assets/staticData';
import {colors} from '../Constant/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AddFollowing, RemoveFollowing} from '../redux/followReducer';
import {likePost} from '../redux/postReducer';

const HomePage = () => {
  const people = 1;
  const post = 2;
  const [selectPart, setSelectPart] = useState(post);
  const [followerData, setFollowerData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imgUri, setImgUri] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listUser = useSelector(state => state.follow.following);
  const allPost = useSelector(state => state.post.post);

  const toogleUsers = data => {
    if (listUser.includes(data)) {
      const filterData = listUser.filter(item => item != data);
      dispatch(RemoveFollowing(filterData));
    } else {
      dispatch(AddFollowing(data));
    }
  };

  const RenderItem = ({item}) => {
    const checkFollow = listUser?.some(user => user?.id == item?.id);
    const colId = item?.id % 2 == 0;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 5,
            borderRadius: 5,
            backgroundColor: colId ? '#d6d2d2' : '#ebe8e8',
          },
        ]}>
        <Text>{item?.name}</Text>
        <Pressable
          onPress={() => toogleUsers(item)}
          style={[
            styles.followBtn,
            {backgroundColor: checkFollow ? colors.blue : colors.black},
          ]}>
          <Text style={{color: colors.white}}>
            {checkFollow ? 'Unfollow' : 'Follow'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderPost = ({item}) => {
    console.log('itemn sis  ', item);
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 4,
          backgroundColor: colors.white,
        }}>
        <View style={{flexDirection: 'row', marginTop: 15, flex: 1}}>
          {/* {item?.img.map((item, index) => (
            <Pressable
              onPress={() => {
                setImgUri(item?.uri);
                setShowModal(true);
              }}>
              <Image
                resizeMode="contain"
                style={{width: 90, height: 90, marginLeft: 15}}
                source={{uri: item?.uri}}
              />
            </Pressable>
          ))} */}

          <FlatList
            data={item?.img}
            horizontal
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setImgUri(item?.path);
                  setShowModal(true);
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: 90, height: 90, marginLeft: 15}}
                  source={{uri: item?.path}}
                />
              </Pressable>
            )}
            ItemSeparatorComponent={<View style={{width: 15}} />}
            ListFooterComponent={<View style={{paddingRight: 15}} />}
          />
        </View>
        <Text style={{padding: 10}} numberOfLines={3}>
          {item?.desc}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
          <Pressable onPress={() => dispatch(likePost(item?.postId))}>
            <AntDesign
              name={item?.like ? 'heart' : 'hearto'}
              size={20}
              color={item?.like ? colors.orange : colors.black}
            />
          </Pressable>
          {item?.numOfLike > 0 && (
            <Text style={{paddingLeft: 5}}>{item?.numOfLike}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 15}}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showModal}
        style={{flex:1,backgroundColor:"rgba(247, 250, 248,0.4)"}}
        onRequestClose={() => setShowModal(!showModal)}>
        <TouchableWithoutFeedback
          onPress={() => setShowModal(false)}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="center"
            source={{uri: imgUri}}
          />
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{flexDirection: 'row', paddingTop: 15}}>
        <CustomButton
          onpress={() => setSelectPart(people)}
          btnText="People"
          showBg={selectPart == people}
        />

        <CustomButton
          onpress={() => setSelectPart(post)}
          btnText="Posts"
          style={{marginLeft: 10}}
          showBg={selectPart == post}
        />
      </View>
      {selectPart == people ? (
        <FlatList
          style={{paddingTop: 10}}
          data={users}
          renderItem={RenderItem}
          scrollsToTop={true}
          bounces={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
          ItemSeparatorComponent={<View style={{height: 10}} />}
          ListFooterComponent={<View style={{paddingBottom: 15}} />}
        />
      ) : (
        <View style={{flex: 1, paddingTop: 15, paddingVertical: 25}}>
          <FlatList
            data={allPost}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{height: 10}} />}
            keyExtractor={item => item?.uri}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('addNewPost')}
            style={styles.addBtn}>
            <Text style={{fontSize: 30, color: colors.white}}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  followBtn: {
    borderRadius: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: colors.blue,
  },
});

export default HomePage;
