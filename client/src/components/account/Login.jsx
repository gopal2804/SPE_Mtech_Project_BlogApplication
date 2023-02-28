import { useState } from 'react';
//Box like a div in html
//TextField like html input tag
//Typography replacement for <p>
import { Box, TextField , Button , styled , Typography} from '@mui/material';

const Component=styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);

`;

const Image=styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper=styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div , & > button , & > p {
        margin-top: 20px;
    } 

`
const LoginButton=styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`

const SignupButton=styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb( 0 0 0/ 20%); 
`

const Text=styled(Typography)`
    color: #878787;
    font-size: 16px;
`

const signupInitialValues={
    name: '',
    username: '',
    password: ''
}


const Login=()=>{

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount]=useState('login');
    const [signup, setSignup]=useState(signupInitialValues);

    const toggleSignup=()=>{
        account === 'signup' ?  toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange=(event)=>{
        setSignup({...signup, [event.target.name] : event.target.value});
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />   
                {
                    //coonditional if condition to render different wrapper content
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='standard' label="Enter Username"/>
                            <TextField variant='standard'label="Enter Password"/>   
                            <LoginButton variant='contained'>Login</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <SignupButton onClick={()=>toggleSignup()}>Create an account</SignupButton>    
                        </Wrapper>:
                        <Wrapper>
                            <TextField variant='standard' onChange={(event)=>onInputChange(event)} name='name' label="Enter Name"/>
                            <TextField variant='standard' onChange={(event)=>onInputChange(event)} name='username' label="Enter Uername"/>
                            <TextField variant='standard' onChange={(event)=>onInputChange(event)} name='password' label="Enter Password"/>   
                            <SignupButton>Signup</SignupButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <LoginButton variant='contained' onClick={()=>toggleSignup()}>Already have an account</LoginButton>    
                        </Wrapper>

                }
            </Box> 
        </Component>
    )
}

export default Login;