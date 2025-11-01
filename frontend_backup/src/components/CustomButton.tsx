import Button from '@mui/joy/Button';

function CustomButton(props:any) {
  return (
     <Button color={props.color} variant="soft" sx={{ mt: 1 /* margin top */ }} onClick={props.onClick}>{props.text}</Button>
  )
}

export default CustomButton