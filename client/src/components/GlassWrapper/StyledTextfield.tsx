import { TextField, styled } from '@mui/material';

const OrangeTextfield = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'orange',
  },
  '& label': {
    color: 'orange',
  },
  '& label.Mui-focused': {
    color: 'white',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },

    '&.Mui-disabled fieldset': {
      color: 'white',
      borderColor: 'orange',
    },
  },
});

export default function StyledTextfield(props) {
  return <OrangeTextfield size="small" variant="outlined" label={props.label} type={props.type} name={props.name} onChange={props.onChange} fullWidth {...props} />;
}
