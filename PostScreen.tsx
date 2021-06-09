import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, User, Post } from './types';
import theme from './theme';

interface PostScreenProps {
  post: Post;
}

export const PostScreen = React.memo((navigation, {post, item }: PostScreenProps): React.ReactElement => {

  console.log('post screen-----', post, item , navigation)

  const renderItem = ({item}) => {
    console.log('post item----', item)
    return (
      <PostRow>
        <H1>{ item.id}</H1>
        <H1>{item.title}</H1>
      </PostRow>
    );
  }

  return (
    <Container>
      <TopBar>
        <Column>
          <H1>{`post.title`}</H1>
        </Column>
      </TopBar>
      <PostsContainer>
        <FlatList
          data={[{id: 1}]}
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
}))(PostScreen);

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