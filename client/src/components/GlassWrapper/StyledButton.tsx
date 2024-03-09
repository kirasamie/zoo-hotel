import { Button, styled } from "@mui/material";

const OrangeButton = styled(Button)({
  color: '#ffffff',
  textShadow: '0 1px 2px #000000',
  fontWeight: 'bold',
  backgroundColor: '#f6ae2d',
  '&:hover': {
    backgroundColor: '#ffc862',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ffa600',
    borderColor: '#d38900',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(255, 200, 98,.5)',
  },
});

export default function StyledButton(props) {
  return <OrangeButton {...props}>{props.children}</OrangeButton>;
}
