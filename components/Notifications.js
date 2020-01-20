import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CURRENT_USER_QUERY } from '../components/auth/User';
import Error from './ErrorMessage';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export const WAS_SEEN_MUTATION = gql`
  mutation WAS_SEEN_MUTATION {
    updateAllNotificationWasSeen
  }
`;

const Notifications = ({ notifications }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [badgeNumber, setBadgeNumber] = useState(0);

  useEffect(() => {
    setBadgeNumber(notifications.filter(n => n.wasSeen === false).length);
  }, [notifications]);

  const handleClick = (e, wasSeen) => {
    setAnchorEl(e.currentTarget);
    if (badgeNumber > 0) {
      wasSeen();
    }
  };
  console.log(notifications);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Mutation
      mutation={WAS_SEEN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(wasSeen, { error, loading }) => (
        <div>
          <Error error={error} />
          <div onClick={e => handleClick(e, wasSeen)} className={classes.root}>
            <IconButton color="black" aria-label="open notifications list">
              <Badge color="primary" badgeContent={badgeNumber}>
                <NotificationsNoneOutlinedIcon fontSize="large" />
              </Badge>
            </IconButton>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {notifications.length > 0 ? (
              notifications.map(n => (
                <Link href={`question?id=${n.answer.answeredTo[0].id}`}>
                  <div className={classes.row}>
                    <MenuItem onClick={handleClose}>
                      {`New answer from ${n.answer.answeredBy.display}`}
                    </MenuItem>
                  </div>
                </Link>
              ))
            ) : (
              <MenuItem>No notifications!</MenuItem>
            )}
          </Menu>
        </div>
      )}
    </Mutation>
  );
};

export default Notifications;
