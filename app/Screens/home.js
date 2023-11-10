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
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 4,
          backgroundColor: colors.white,
        }}>
        <View style={{flexDirection: 'row', marginTop: 15, flex: 1}}>
          {item?.img.map((item, index) => (
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
          ))}
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
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
          ItemSeparatorComponent={<View style={{height: 10}} />}
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
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  followBtn: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addBtn: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
  },
});

export default HomePage;
