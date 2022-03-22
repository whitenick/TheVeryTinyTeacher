import React from 'react';
import PropTypes from 'prop-types';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import {
    makeStyles,
    Toolbar,
    Grid,
    Paper,
    Box,
    Button,
    IconButton,
    Typography,
    Link
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'white',
    color: '#4bcbcc'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor: '#ff79b0'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = { sections: [{ title: 'Home', url: '/home'}], title: "The Very Tiny Teacher"};

  return (
    <React.Fragment>
      <Toolbar boxShadow={2} className={classes.toolbar}>
          <Grid container spacing={3}>
              <Grid item xs={2}/>
              <Grid item xs={8} >
                    <img src="/WebsiteHeader.png"/>
              </Grid>
              <Grid item xs={2}>
                <Button size="small">TPT</Button>
                <IconButton>
                    <InstagramIcon />
                </IconButton>
                <IconButton>
                    <PinterestIcon />
                </IconButton>
                <Button size="small">
                    More
                </Button>
              </Grid>
          </Grid>
      </Toolbar>
      <Box boxShadow={2}>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            {sections.map((section) => (
            <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                className={classes.toolbarLink}
            >
                {section.title}
            </Link>
            ))}
        </Toolbar>
      </Box>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};