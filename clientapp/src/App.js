import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import {
  Box,
  makeStyles,
  Container
} from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url('/lily.jpg')"
  },
  contain: {
    backgroundColor: 'white'
  }
}))

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.contain}>
        <Box >
          <Header />
          <Home />
        </Box>
      </Container>
    </div>
  );
}

export default App;
