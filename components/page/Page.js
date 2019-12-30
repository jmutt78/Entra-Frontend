import React, { useState } from 'react';
import Drift from 'react-driftjs';
import classNames from 'classnames';
import clsx from 'clsx';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './Page.css';
import Error from './../ErrorMessage.js';
import Footer from '../footer';
import Meta from '../meta/Meta.js';
import { CURRENT_USER_QUERY } from '../auth/User';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  // content styles
  contentContainer: {
    display: 'flex',
    flex: 1,
    minHeight: theme.layout.contentMinHeight
  },
  scrollContainer: {
    display: 'flex',
    flex: 1,
    maxHeight: '100%'
  }
}));

const Page = ({ children, router }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const isSearchResultPage = router.pathname === '/searchResults';
  const isScrollablePage =
    router.pathname === '/all' ||
    router.pathname === '/myfeed' ||
    router.pathname === '/tags' ||
    router.pathname === '/users';
  const isLanding = router.pathname === '/';

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;

        return (
          <>
            <Meta />
            <div className={classes.root}>
              <CssBaseline />

              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    Mini variant drawer
                  </Typography>
                </Toolbar>
              </AppBar>

              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                  })
                }}
                open={open}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                    (text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    )
                  )}
                </List>
                <Divider />
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
              </main>
            </div>

            <div
              className={classNames(
                isLanding || isSearchResultPage || isScrollablePage
                  ? 'noPadding'
                  : 'contentContainerPadding',
                isSearchResultPage || isScrollablePage ? 'hideScroll' : ''
              )}
            >
              <div
                className={classNames(
                  isSearchResultPage || isScrollablePage
                    ? classes.scrollContainer
                    : classes.contentContainer,
                  'contentContainer'
                )}
              >
                {children}
              </div>
              <Drift appId="rz4xagciytry" />
            </div>
            {isLanding && <Footer />}
          </>
        );
      }}
    </Query>
  );
};

export default withRouter(Page);
