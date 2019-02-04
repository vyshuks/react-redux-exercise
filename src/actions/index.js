import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    let usersIds = [];
    for(let post of getState().posts){
        usersIds.push(post.userId);
    }
    usersIds = [...new Set(usersIds)];
    usersIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
};
