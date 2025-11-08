import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import Link from '@mui/joy/Link';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputBox from './InputBox';
import CustomButton from './CustomButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastContainerComponent from './ToastContainerComponent';
import { BACKEND_URL } from '../lib/config';

// function ModeToggle() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   // necessary for server-side rendering
//   // because mode is undefined on the server
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return <Button variant="soft">Change mode</Button>;
//   }

//   return (
//     // <Select
//     //   variant="soft"
//     //   value={mode}
//     //   onChange={(event, newMode) => {
//     //     setMode(newMode);
//     //   }}
//     //   sx={{ width: 'max-content' }}
//     // >
//     //   {/* <Option value="system">System</Option>
//     //   <Option value="light">Light</Option>
//     //   <Option value="dark">Dark</Option> */}
//     // </Select>
//   );
// }

export default function Signup(/*props*/) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <CssVarsProvider /*{...props}*/>
        {/* <ModeToggle /> */}
        <CssBaseline />
        {/* <div className="h-screen w-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex justify-center items-center"> */}
    <Sheet
      sx={{
        width: "100%",
        maxWidth: 380,
        mx: "auto",
        my: 4,
        py: 3,
        px: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        color: "white",
        background:
          "linear-gradient(135deg, rgba(186,186,186,0.6), rgba(99, 106, 125,0.9))",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
      variant="outlined"
    >

          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>


          <InputBox name="Email" type="Email" placeholder="johndoe@email.com" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          <InputBox name="username" type="username" placeholder="john doe" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
          <InputBox name="password" type="password" placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

        <CustomButton text="Sign up" onClick={async() => {
          const response =await axios.post(`${BACKEND_URL}/api/auth/signup`, {
            email: email,
            name: username,
            password: password
          })

          //set the token in local storage
          if(!response.data.token){
            toast.error("Sign up failed ...")
            return;
          }
          if(response.data.token){
            localStorage.setItem('token', response.data.token);
          }
           toast.success('Signup successful! Redirecting...');
            setTimeout(() => {
            navigate('/dashboard'); 
          }, 1500); 

        }} />
        <Typography
          endDecorator={<Link href="/signin">Sign in</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
          </Typography>
        </Sheet>
        <ToastContainerComponent/>
      </CssVarsProvider>
    </main>
  );
}


