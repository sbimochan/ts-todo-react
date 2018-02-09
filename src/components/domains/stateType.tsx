import { Moment } from 'moment';

interface Momentdd extends Moment {
  _d?: Date;
}

export interface StateType {
  todoList: TodoListInterface[];
  description: string;
  editTodo: string;
  editTodoId: number | null;
  searchbar: string;
  tags: number[];
  tagsList: { data: TagsList[]};
  togglePopUp: boolean;
  pagination: number;
  pageCount: number;
  tagsRelated: TagsRelatedInterface[];
  userId: number | null;
  isAuth: string;
  startDate: Momentdd;
}
export interface TodoListInterface {
  createdAt: Momentdd;
  description: string;
  id: number;
  tags: TagsInterface[];
  userId: number;
  user: UserInterface;
}
export interface TagsInterface {
  createdAt: Momentdd;
  id: number;
  tagName: string;
  _pivot_tag_id: number;
  _pivot_todoList_id: number;
}
export interface UserInterface {
  createdAt: Momentdd;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  updatedAt: Momentdd;
  username: string;
}
export interface TagsList {
  createdAt: Date;
  id: number;
  tagName: string;
}
export interface TagsRelatedInterface {
  createdAt: Date;
  description: string;
  id: number;
  userId: number;
  _pivot_tag_id: number;
  _pivot_todoList_id: number;

}