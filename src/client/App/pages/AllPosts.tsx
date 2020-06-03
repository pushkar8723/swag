import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { AppStateConsumer, IAppState } from '../index';
import PostsList from '../components/PostsList';
import { GET_ALL_POSTS } from '../shared/queries';

const Container = styled.div`
    max-width: 100%;
    width: 1000px;
    margin: 0 auto;
`;

export default function () {
    return (
        <AppStateConsumer>
            {(state: IAppState) => (
                <>
                    <Container>
                        <Query
                            query={GET_ALL_POSTS}
                            context={{ headers: { id_token: state.idToken } }}
                            fetchPolicy="cache-and-network"
                        >
                            {
                                ({ loading, error, data }: QueryResult) => {
                                    if (loading) {
                                        return <h4>Loading...</h4>;
                                    }
                                    if (error) {
                                        return <div>{error.message}</div>;
                                    }
                                    if (data) {
                                        return (
                                            <>
                                                <PostsList
                                                    posts={data.getAllPosts}
                                                    idToken={state.idToken}
                                                />
                                            </>
                                        );
                                    }
                                    return null;
                                }
                            }
                        </Query>
                    </Container>
                </>
            )}
        </AppStateConsumer>
    );
}
