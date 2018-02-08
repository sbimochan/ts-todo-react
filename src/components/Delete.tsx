/**Global imports */
import * as React from 'react';

export interface DeleteProps {
  data: number;
  handleDelete: any;
}
const Delete = (props: DeleteProps) => {
  return (
    <button className="button btn-danger"
      value={props.data}
      onClick={props.handleDelete}>Delete Todo</button>
  );
}
export default Delete;