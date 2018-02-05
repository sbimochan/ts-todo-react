/**Global imports */
import React from 'react';

/* Local imports */
import './Todo.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Create = (props) => {
  return (
    <div className="createForm">
      <h1>Create todo</h1>
      <form onSubmit={props.handleSubmit}>
        <div>
          Todo:<textarea
            rows="8"
            type="text"
            id="searchInputBox"
            name="description"
            value={props.description}
            onChange={props.handleInputChange}
          />
        </div>
        <div className="tags">
          {props.fetchTags.data
            ? props.fetchTags.data.map((tags, index) => (
                <div className="tagsList" key={index}>
                  <input
                    type="checkbox"
                    name="tagsCheckbox"
                    value={tags.id}
                    onChange={props.checkboxChange}
                  />
                  <label>{tags.tagName}</label>
                </div>
              ))
            : null}
        </div>
        Date:
        <DatePicker
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
