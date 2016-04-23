import { fetchPostAction } from '../actions/post'
import { fetchCommentAction } from '../actions/post'

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case fetchPostAction.start:
            return { ...state, isLoading: true }
        case fetchPostAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
            return { ...state,
                isLoading: false,
                isError: false,
                items
            }
        case fetchPostAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'ADD_NEW_POST':
            const { items: newItems } = state;
            newItems[action.groupId].unshift(action.item);
            return { ...state, items: newItems }
        case 'DELETE_POST':
            const { items: deletedItems } = state;
            const posts = deletedItems[action.groupId];
            console.log('[before] ', posts);
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == action.postId) {
                    posts.splice(i, 1);
                }
            }
            console.log('[after] ', posts);
            deletedItems[action.groupId] = posts;
            // const newItemsAfterDelete = deletedItems[action.groupId].map(item => {
            //     if (item.id != action.postId) return item
            // });
            // deletedItems[action.groupId] = newItemsAfterDelete
            return {...state, items: deletedItems}
        default:
            return state
    }
}


export const comments = (state = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}, action) => {
    switch (action.type) {
        case fetchCommentAction.start:
            return { ...state, isLoading: true }
        case fetchCommentAction.success:
            const { items } = state;
            items[action.postId] = action.items;
            return { ...state,
                isLoading: false,
                isError: false,
                items
            }
        case 'ADD_COMMENT':
            const { items: its } = state;
            its[action.postId].push(action.item)
            return { ...state, items: its }
        case fetchCommentAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}

export default posts
