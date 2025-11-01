import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';

import Link from '@mui/joy/Link';

import InputBox from './InputBox';
import CustomButton from './CustomButton';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ToastContainerComponent from './ToastContainerComponent';

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

export default function Signin(/*props*/) {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [ password, setPassword] = useState("");

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


          <InputBox name="Email" type="Email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} placeholder="johndoe@email.com" />
          {/* <InputBox name="username" type="username" placeholder="john doe" /> */}
          <InputBox name="password" type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} placeholder="password" />
          
        <CustomButton text="Sign up" onClick={async() => {
          const response = await axios.post('http://localhost:3000/api/auth/signin',{
            email,
            password
          })

          if(!response.data.token){
            toast.error("Error Whiling sign in");
            return;
          }
          localStorage.setItem("token", response.data.token);
          toast.success("Signup successful!");

          
          navigate('/dashboard')
          //verify the token
          //
        }} />
          <Typography
            endDecorator={<Link href="/signup">Sign up</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
        <ToastContainerComponent/>
        {/* </div> */}
      </CssVarsProvider>
    </main>
  );
}


