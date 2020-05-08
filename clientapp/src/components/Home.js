import React from 'react';
import {
    makeStyles,
    Box,
    Container,
    Grid
} from '@material-ui/core';
import About from './About';
import Posts from './Posts';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Home = props => {
    const classes = useStyles();

    return (
        <Box mt={10}>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <About/>
                    </Grid>
                    <Grid item xs={8}>
                        <Posts/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Home;