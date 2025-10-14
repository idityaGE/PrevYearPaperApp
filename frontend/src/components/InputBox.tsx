import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
function InputBox(props:any) {
  return (
            <FormControl>
            <FormLabel>{props.name}</FormLabel>
            <Input
              // html input attribute
               sx={{
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'black',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                '&::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                },
            }}
              name={props.name}
              type={props.type}
              placeholder={props.placeholder}
              onChange={props.onChange}
              
            />
   
          </FormControl>
  )
}

export default InputBox
