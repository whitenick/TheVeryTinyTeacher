import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    post: {
        'height': 650
    }
}))
const Posts = props => {
    const classes = useStyles();

    return (
        <Box boxShadow={2} className={classes.post}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper>Sarah's First Post</Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Posts;