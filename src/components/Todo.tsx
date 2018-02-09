/** Global imports */
import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import * as ReactPaginate from 'react-paginate';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';

/** Local imports */
import './Todo.css';
import Create from './Create';
import Search from './Search';
import { Moment } from 'moment';
import TodoList from './TodoList';
import UpdateBox from './UpdateBox';
import TagsRelated from './TagsRelated';
import * as ApiServices from '../services/api';
import * as todoActions from './actions/action';
import { ChangeTodoList, FetchTags, TagsRelatedType } from './domains/actionTypes';
import * as stateTypes from './domains/stateType';

interface Momentdd extends Moment {
  _d?: Date;
}

export interface TodoProps {
  dispatch: any;
  todoList: stateTypes.TodoListInterface[];
  tags: number[];
  pageCount: number;
  editTodo: string;
  editTodoId: number;
  tagsList: {
    data: stateTypes.TagsList[];
  };
  startDate: Momentdd;
  description: string;
  togglePopUp: boolean;
  tagsRelated: stateTypes.TagsRelatedInterface[];
  handlePageClick(event: {}): void;
}

function ReactPaginateInterface(props: any) {
  return <ReactPaginate {...props} />;
}

function CreateProps(props: any) {
  return <Create {...props} />;
}
function TodoListInterface(props: any) {
  return <TodoList {...props} />;
}
// interface X {
//   id: number;
// }

class Todo extends React.Component<TodoProps, any> {
  userId = localStorage.getItem('userId');
  getData = (todoData: string) => this.editTodo(todoData);
  handleLogout = event => {
    ApiServices.logout('logout');
    this.props.dispatch(todoActions.isAuth('false'));
  }

  getTodoId = (id: number) => this.props.dispatch(todoActions.getTodoId(id));
  
  editTodo = (todoData: string) => this.props.dispatch(todoActions.editTodo(todoData));

  onChangeTodoList = (todoList: ChangeTodoList[]) =>
    this.props.dispatch(todoActions.changeTodoList(todoList))
  handleInputChange = (event: any) =>
    this.props.dispatch(todoActions.changeDescription(event.target.value))
  handleInputChangeOfUpdate = (event: any) =>
    this.props.dispatch(todoActions.editTodo(event.target.value))
  handleDatePicker = (date: any) =>
    this.props.dispatch(todoActions.changeDatePicker(date))
  handleSubmit = (event: any) => {
    event.preventDefault();
    ApiServices.addTodo('users/' + this.userId + '/todo', this.props).then(() =>
      ApiServices.fetchPages('users/' + this.userId + '/todo').then(
        (todoList: { todo: ChangeTodoList[] }) => {
          this.onChangeTodoList(todoList.todo);
        }
      )
    );
  }

  handleSearch = (event: any) => {
    event.preventDefault();
    this.props.dispatch(todoActions.handleSearch(event.target.value));
    ApiServices.searchTodo(
      'users/' + this.userId + '/todo',
      event.target.value
    ).then((result: {
      todo: ChangeTodoList[];
      pagination: {
        pageCount: number;
      };
    }) => {
      this.props.dispatch(todoActions.changeTodoList(result.todo));
      this.props.dispatch(todoActions.pageCount(result.pagination.pageCount));
    });
  }

  handleDelete = (event: any) => {
    event.preventDefault();

    ApiServices.deleteTodo(
      'users/' + this.userId + '/todo/',
      event.target.value
    ).then(() =>
      ApiServices.fetchPages('users/' + this.userId + '/todo').then(
        (todoList: { todo: ChangeTodoList[] }) => {
          this.onChangeTodoList(todoList.todo);
        }
      )
    );
  }

  handleEdit = (event: any) => {
    event.preventDefault();
    this.getTodoId(+event.target.dataset.key);
    this.getData(event.target.value);
    this.props.dispatch(todoActions.changeTogglePopUp(true));
  }
  reorderTodo = (itemId: number, index: string) => {
    this.props.dispatch(todoActions.reorderItem(itemId, index));
  }
  handleUpdate = (event: any) => {
    event.preventDefault();
    const formatData = {
      description: this.props.editTodo
    };
    ApiServices.updateTodo(
      'users/' + this.userId + '/todo/',
      this.props.editTodoId,
      formatData
    ).then(() =>
      ApiServices.fetchPages('users/' + this.userId + '/todo').then(
        (todoList: { todo: ChangeTodoList[] }) => {
          this.onChangeTodoList(todoList.todo);
          this.props.dispatch(todoActions.changeTogglePopUp(false));
        }
      )
    );
  }

  reorderList = (array: any, value: number, positionChange: number) => {
    let oldIndex = array.findIndex(x => x.id === value);
    let arrayClone = array.slice();
    arrayClone.splice(positionChange, 0, arrayClone.splice(oldIndex, 1)[0]);
    return arrayClone;
  }

  handlePageClick = (data: {
    selected: number;
  }) => {
    data.selected = data.selected + 1; // hack code
    this.props.dispatch(todoActions.handlePagination(data.selected));
    ApiServices.paginateTodo(
      'users/' + this.userId + '/todo',
      data.selected
    ).then((result: {
      todo: ChangeTodoList[];
    }) =>
      this.props.dispatch(todoActions.changeTodoList(result.todo))
    );
  }

  componentDidMount() {
    ApiServices.fetchPages('users/' + this.userId + '/todo').then(todoList => {
      this.props.dispatch(todoActions.changeTodoList(todoList.todo));
      this.props.dispatch(todoActions.pageCount(todoList.pagination.pageCount));
    });
    ApiServices.fetchTags('/tags').then((tags: {data: FetchTags[]}) =>
      this.props.dispatch(todoActions.fetchTags(tags))
    );
  }
  tagLink = (event: any) => {
    event.preventDefault();
    ApiServices.todosRelated('/tags', event.target.value).then((todos: {
      data: {
        todos: TagsRelatedType;
      }
    }) =>
      this.props.dispatch(todoActions.tagsRelated(todos.data.todos))
    );
  }

  checkboxChange = (event: any) => {
    const tags = this.props.tags;
    let index;
    if (event.target.checked) {
      tags.push(event.target.value); // + is to convert into integer
    } else {
      index = tags.indexOf(event.target.value);
      tags.splice(index, 1);
    }
    this.props.dispatch(todoActions.checkboxChange(tags));
  }

  render() {
    BigCalendar.momentLocalizer(moment);
    const events = this.props.todoList.map((data: any, index: number) => ({
      allDay: true,
      sakkyo: data.createdAt,
      suruvayo: data.createdAt,
      title: data.description
    }));

    return (
      <div>
        <div className="header">
          Todo-lists
          <Link
            to="/"
            className="button btn-danger"
            onClick={this.handleLogout}
          >
            Logout
          </Link>
        </div>
        <Search handleSearch={this.handleSearch} />
        <div className="todoCount">
          Todo count:<span className="badge">{this.props.todoList.length}</span>
        </div>
        {this.props.todoList.map((data: {}, index: number) => (
          <TodoListInterface
            data={data}
            index={index}
            key={index}
            handleEdit={this.handleEdit}
            tagLink={this.tagLink}
            editTodo={this.editTodo}
            handleDelete={this.handleDelete}
            onDeleteTodo={this.onChangeTodoList}
            // reorderList={this.reorderList}
            reorderTodo={this.reorderTodo}
          />
        ))}
        <BigCalendar
          events={events}
          startAccessor="suruvayo"
          endAccessor="sakkyo"
        />
        <ReactPaginateInterface
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />

        <CreateProps
          handleSubmit={this.handleSubmit}
          fetchTags={this.props.tagsList}
          startDate={this.props.startDate}
          checkboxChange={this.checkboxChange}
          value={this.props.description}
          handleInputChange={this.handleInputChange}
          handleDatePicker={this.handleDatePicker}
        />
        <UpdateBox
          prevData={this.props.editTodo}
          handleInputChangeOfUpdate={this.handleInputChangeOfUpdate}
          todoId={this.props.editTodoId}
          handleUpdate={this.handleUpdate}
          isDisplay={this.props.togglePopUp ? 'displayOn' : 'displayOff'}
        />
        <TagsRelated data={this.props.tagsRelated} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const todoApp = connect(mapStateToProps)(Todo);
// export default todoApp;
export default DragDropContext(HTML5Backend)(todoApp);
