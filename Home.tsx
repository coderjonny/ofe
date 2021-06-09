import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, User, Post } from './types';
import theme from './theme';
import { StackNavigationProp } from '@react-navigation/stack';

interface HomeProps {
  users: User[];
  posts: Post[];
  fetchUsers: () => void;
  fetchPosts: () => void;
  navigation: StackNavigationProp<
    {post: Post},
    'POST'
  >
}

export const Home = React.memo(({ posts, users, fetchUsers, fetchPosts, navigation}: HomeProps): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    setLoading(false);
  }, []);
  const [ userToShow, setUserToShow ] = useState(2);

  const user = users[userToShow];

  const userPosts = useMemo( () => posts.filter( (post) => post.userId === user.id ) , [showUser])

  useEffect(() => {
    setShowUser(user)
  }) 


  // console.log('userPosts------', userPosts, posts, users)

  const next = () => {
    if (userToShow < users.length - 1) {
      setUserToShow(userToShow + 1);
    } else {
      setUserToShow(0);
    }
  };
  const prev = () => { 
    if (userToShow > 0) {
      setUserToShow(userToShow - 1)
    } else {
      setUserToShow(users.length - 1)
    }
  };


  if (!users.length) {
    return null;
  }


  const renderItem = ({item}) => {
    console.log('post item----', item)
    const onPressPost = () => {
      console.log('onPressPost---', item)
      navigation.navigate("POST", { post: item });
    }

    return (
      <PostRow onPress={onPressPost}>
        <H1>{loading ? 'loading' : item.id}</H1>
        <H1>{loading ? 'loading' : item.title}</H1>
      </PostRow>
    );
  }

  return (
    <Container>
      <TopBar>
        <Column>
          <H1>{loading ? 'loading' : user.name}</H1>
          <S1>{loading ? 'loading' : user.website}</S1>
        </Column>
        <Column>
          <Row>
            <TouchableOpacity onPress={prev}>
              <ArrowIcon
                name="md-arrow-back"
                size={32}
                color={theme.colors.accent}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
              <ArrowIcon
                name="md-arrow-forward"
                size={32}
                color={theme.colors.accent}
              />
            </TouchableOpacity>
          </Row>
        </Column>
      </TopBar>
      <PostsContainer>
        <FlatList
          data={userPosts}
          renderItem={renderItem}
          keyExtractor={(data, index ) => `${data.id} + ${index}`}
        />
      </PostsContainer>
    </Container>
  );
});

export default connect((state: State) => ({
  users: Selectors.userData(state),
  posts: Selectors.postData(state),
}), dispatch => ({
  fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
  fetchPosts: () => dispatch(Actions.posts.fetchPosts.trigger()),
}))(Home);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const TopBar = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
`

const PostsContainer = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg}px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  justify-content: space-between;
  flex-direction: row;
`

const Column = styled.View`
`;

const Row = styled.View`
  flex-direction: row;
`

const PostRow = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${({theme}) => theme.space.lg}px 0;
  background-color: ${({ theme }) => theme.colors.white};
`

const ArrowIcon = styled(Ionicons)`
  margin: 0 ${({ theme }) => theme.space.md}px;
`

const H1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.basic};
`

const S1 = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.basic200};
`