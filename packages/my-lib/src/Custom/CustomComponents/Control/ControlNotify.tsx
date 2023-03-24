import { withJsonFormsControlProps } from '@jsonforms/react';
import CustomNotify from '../Components/CustomNotify';
import { message } from '../Components/CustomNotify';

const ControlNotify = (props:any) => {
  const data:any = props.uischema?.value?.content?.message
  return(
    <CustomNotify data = {data}
   />)
  }

export default withJsonFormsControlProps(ControlNotify);