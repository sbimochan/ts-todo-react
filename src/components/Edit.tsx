/**Global imports */
import * as React from 'react';

export interface EditProps{
  data:{
    id:number;
    description:string;
  };
  handleEdit:any;
}

 const Edit = (props:EditProps) =>{
   return (
     <div className="editButton">
       <button className="button btn-warning" data-key={props.data.id} value={props.data.description} onClick={props.handleEdit} > Edit Todo </button>
     </div>
   );
 } 
 export default Edit;