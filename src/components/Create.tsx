/** Global imports */
import * as React from 'react';

/* Local imports */
import './Todo.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Moment } from 'moment';

interface Momentdd extends Moment {
  _d?: Date;
}

export interface CreateProps {
  value: string;
  fetchTags: {
    data: Array<{
      id: number;
      tagName: string;
      createdAt: string;
    }>;
  };
  startDate: Momentdd;
  handleDatePicker(event: {}): void;
  checkboxChange(event: {}): void;
  handleInputChange(event: {}): void;
  handleSubmit(event: {}): void;
}

function Input(props: any) {
  return <input {...props} />;
}
function DatePickerInterface(props: any){
  return <DatePicker {...props} />;
}
// export interface CreateInterface {
//   value: string;
//   fetchTags: {
//     data: Array<{
//       id: number;
//       tagName: string;
//       createdAt: string;
//     }>;
//   };
//   startDate: any;
//   checkboxChange(event: {}): void;
//   handleDatePicker(event: {}): void;
//   handleInputChange(event: {}): void;
//   handleSubmit(event: {}): void;
// }
const Create = (props: CreateProps) => {
  return (
    <div className="createForm">
      <h1>Create todo</h1>
      <form onSubmit={props.handleSubmit}>
        <div>
          Todo:<textarea
            id="searchInputBox"
            name="description"
            value={props.value}
            onChange={props.handleInputChange}
          />
        </div>
        <div className="tags">
          {props.fetchTags.data
            ? props.fetchTags.data.map(
              (
                tags: {
                  id: number;
                  tagName: string;
                },
                index: number
              ) => (
                  <div className="tagsList" key={index}>
                    <Input
                      type="checkbox"
                      name="tagsCheckbox"
                      value={tags.id}
                      onChange={props.checkboxChange}
                    />
                    <label>{tags.tagName}</label>
                  </div>
                )
            )
            : null}
        </div>
        Date:
        <DatePickerInterface
          selected={props.startDate}
          onChange={props.handleDatePicker}
          placeholderText="Weeks start on Monday"
        />
        <input type="submit" className="button" value="shoot" />
      </form>
    </div>
  );
};
export default Create;
