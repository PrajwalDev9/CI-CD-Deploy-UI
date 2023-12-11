import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';





export default function Navbar() {
  const navigate = useNavigate();

  return (

    <AppBar position='static' sx={{
      // background: '#2196f3'
      backgroundImage: 'linear-gradient(to right,#2196f3, #01579b)',

    }}>



      <Toolbar>



        <Typography variant="h5" style={{ flexGrow: 1, marginLeft: '33px' }}>



          QuizMaster



        </Typography>



        <Button className='login-button' color="inherit"
          sx={{ marginRight: '33px', fontSize: '15px', padding: '2px 9px', border: '1px solid white' }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login</Button>



      </Toolbar>



    </AppBar>

  )

}
