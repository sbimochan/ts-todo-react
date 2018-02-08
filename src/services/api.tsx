/* Global imports */
import Axios from 'axios';
/** Local imports */
import instance from './instance';
import { getTokenHeader } from './instance';

let baseurl = 'http://127.0.0.1:8848/api/';
interface Window {
  encodeURI?: any;
}

declare var window: Window;

export function fetchPages(page: string) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .get(encodedURI, getTokenHeader('accessToken'))
    .then((response: { data: {} }) => response.data)
    .catch(err => {
      logout('logout');
      return err;
    });
}
/**
 * without token
 * @param {*} page
 * @param {*} data
 */

export function addTodo(page: string, data: {}) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .post(encodedURI, data, getTokenHeader('accessToken'))
    .then((response: { data: {} }) => response.data);
}
export function logout(page: string) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .get(encodedURI, getTokenHeader('refreshToken'))
    .then((response: { data: string }) => {
      if (response.data === 'OK') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAuth');
      } else {
        alert('log out unsuccessful');
      }
    });
}

export function deleteTodo(page: string, todoId: number) {
  let encodedURI = window.encodeURI(baseurl + page + todoId);
  return instance.delete(encodedURI).then((response: { data: {} }) => response.data);
}
export function searchTodo(page: string, query: string) {
  let encodedURI = window.encodeURI(baseurl + page + '?search=' + query);
  return instance.get(encodedURI).then((response: { data: {} }) => response.data);
}
export function paginateTodo(page: string, query: string) {
  let encodedURI = window.encodeURI(baseurl + page + '?page=' + query);
  return instance.get(encodedURI).then((response: { data: {} }) => response.data);
}
export function updateTodo(page: string, id: number, data: {}) {
  let encodedURI = window.encodeURI(baseurl + page + id);
  return instance.put(encodedURI, data).then((response: { data: {} }) => response.data);
}
/* Tags fetch */
export function fetchTags(page: string) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance.get(encodedURI).then((response: { data: {} }) => response.data);
}
/* Tags related todos */
export function todosRelated(page: string, tagid: number) {
  let encodedURI = window.encodeURI(baseurl + page + '/' + tagid);
  return instance.get(encodedURI).then((response: { data: {} }) => response.data);
}

export function login(page: string, data: {}) {
  let encodedURI = window.encodeURI(baseurl + page);
  return Axios.post(encodedURI, data).then((response: { data: {} }) => response.data);
}
