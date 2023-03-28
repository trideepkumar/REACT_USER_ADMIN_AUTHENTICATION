import React, { useState } from 'react'
import {AppBar, Toolbar, Typography ,Box, Tab,Tabs} from '@mui/material'
import { Link } from 'react-router-dom'

function Header() {
    const [value,setValue] = useState()
  return (
    <div>
        <AppBar position='sticky' style={{ backgroundColor: '#7395AE' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MERN APP
        </Typography>
        <Box value={0}>
        <Tabs onChange={(e,value)=>setValue(value)} value={value} textColor='inherit'>
            <Tab to='/login' LinkComponent={Link} label='Login'/>
            <Tab to='/signup' LinkComponent={Link} label='Signup'/>
        </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Header