import { Moment } from 'moment';

export interface Momentdd extends Moment {
  _d?: Date;
}

export interface ChangeTodoList {
  createdAt: Momentdd;
  description: string;
  id: number;
  tags: {
    createdAt: Momentdd;
    id: number;
    tagName: string;
    _pivot_tag_id: number;
    _pivot_todoList_id: number;
  };
  user: {
    createdAt: Momentdd;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    updatedAt: Momentdd;
    username: string;
  };
}

export interface FetchTags {
  createdAt: Momentdd;
  id: number;
  tagName: string;
}

export interface TagsRelatedType {
  createdAt: Momentdd;
  description: string;
  id: number;
  userId: number;
  _pivot_tag_id: number;
  _pivot_todoList_id: number;
}
