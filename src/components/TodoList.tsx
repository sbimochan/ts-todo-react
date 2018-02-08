/** Global imports */
import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
/* Local imports */
import './Todo.css';
import Edit from './Edit';
import Delete from './Delete';
import { DragTypes } from '../reducers/index';

export interface Props {
  user: {
    firstName: string;
    lastName: string;
  };
  description: string;
  date: Date;
  data: {
    id: number;
    description: string;
    createdAt: any;
    user: {
      id: number;
      user: string;
    };
    tags: Array<{
      id: number,
      tagName: string;
    }>;
  };
  reorderTodo: any;
  index: number;
  tagLink: any;
  connectDropTarget;
  connectDragPreview;
  connectDragSource;
  handleDelete(event: {}): void;
  handleEdit(event: {}): void;

}

function User(props) {
  return (
    <div>
      {' '}
      <em>Posted By:{props.user.firstName + ' ' + props.user.lastName}</em>
    </div>
  );
}

function Description(props) {
  return <article>{props.description}</article>;
}

function Date(props) {
  return <p>{props.date}</p>;
}

const itemSource = {
  beginDrag(props: Props) {
    return {
      id: props.data.id
    };
  }
};

const itemTarget = {
  canDrop(props: Props, monitor: {}) {
    return true;
  },

  drop(props: Props, monitor: { getItem: any }) {
    let monitorItem = monitor.getItem();
    props.reorderTodo(monitorItem.id, props.index);
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const TodoList = (props: Props) => {
  const { connectDropTarget, connectDragPreview, connectDragSource } = props;
  return connectDropTarget(
    connectDragPreview(
      connectDragSource(
        <div key={props.data.id} className="todoFrame">
          <Description
            description={props.data.description}
            key={props.data.id}
          />
          <Date date={props.data.createdAt} />
          <User user={props.data.user} key={props.data.user.id} />
          <div className="actions">
            <Delete
              data={props.data.id}
              // index={props.index}
              handleDelete={props.handleDelete}
            />
            <Edit data={props.data} handleEdit={props.handleEdit} />
          </div>
          <ul className="tagsList">
            {props.data.tags.map((tag, index: number) => (
              <li
                className="tag"
                key={index}
                value={tag.id}
                onClick={props.tagLink}
              >
                {tag.tagName}
              </li>
            ))}
          </ul>
        </div>
      )
    )
  );
};
// export default TodoList;
export default DropTarget(DragTypes.ITEM, itemTarget, dropCollect)(
  DragSource(DragTypes.ITEM, itemSource, dragCollect)(TodoList)
);
