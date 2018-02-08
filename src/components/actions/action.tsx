
import { ChangeTodoList, FetchTags, TagsRelatedType, Momentdd } from '../domains/actionTypes';

export const changeTodoList = (payload: ChangeTodoList[]) => {
  return {
    type: 'CHANGE_TODO_LIST',
    payload
  };
};
export const changeTogglePopUp = (payload: boolean) => {
  return {
    type: 'CHANGE_TOGGLE_POPUP',
    payload
  };
};
export const checkboxChange = (payload: number[]) => {
  return {
    type: 'CHECKBOX_CHANGE',
    payload
  };
};
export const fetchTags = (payload: { data: FetchTags[] }) => {
  return {
    type: 'FETCH_TAGS',
    payload
  };
};
export const editTodo = (payload: string) => {
  return {
    type: 'EDIT_TODO',
    payload
  };
};
export const getTodoId = (payload: number) => {
  return {
    type: 'GET_TODO_ID',
    payload
  };
};
export const changeDescription = (payload: string) => {
  return {
    type: 'CHANGE_DESCRIPTION',
    payload
  };
};
export const handleSearch = (payload: string) => {
  return {
    type: 'HANDLE_SEARCH',
    payload
  };
};
export const handlePagination = (payload: number) => {
  return {
    type: 'HANDLE_PAGINATION',
    payload
  };
};
export const pageCount = (payload: number) => {
  return {
    type: 'PAGE_COUNT',
    payload
  };
};
export const tagsRelated = (payload: TagsRelatedType) => {
  return {
    type: 'TAGS_RELATED',
    payload
  };
};
// using string because of localstorage
export const isAuth = (payload: string) => {
  return {
    type: 'IS_AUTH',
    payload
  };
};
export const userId = (payload: string) => {
  return {
    type: 'USER_ID',
    payload
  };
};
export const changeDatePicker = (payload: Momentdd) => {
  return {
    type: 'CHANGE_DATE_PICKER',
    payload
  };
};
export const reorderItem = (id: number, index: string) => {
  return {
    type: 'REORDER_ITEM',
    id,
    index
  };
};
