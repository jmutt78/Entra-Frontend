import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

// import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';

import Avatar from '../Avatar';
import './index.css';

// export const CustomTableCell = withStyles(theme => ({
//   head: {
//     width: 5,
//   },
// }))(TableCell)

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex'
  },

  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  votesBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  title: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,

    fontWeight: 'bold',
    lineHeight: '3rem'
  },
  body: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    lineHeight: '2.1rem'
  },
  tags: {},

  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  },
  button: {
    // /color: palette.primary.dark
  }
});

const ListItem = ({
  item: {
    id,
    title,
    body,
    link,
    createdAt,
    tags,
    answers,
    views,
    upVotes,
    downVotes,
    askedBy
  },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  return (
    <div className={classes.container} onClick={() => router.push(linkTo)}>
      <div className={classes.avatarBox}>
        <Avatar me={user} small />
      </div>
      <div className={classes.votesBox}>
        <div>{upVotes}</div>
        <div>{downVotes}</div>
      </div>
      <div className={classes.textBox}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>

        <Typography variant="h5" className={classes.body}>
          {body}
        </Typography>

        {/*tags && (
          <div className="tags">
            {tags.map(({ id, name }) => (
              <div key={id} style={{ padding: '2px 0' }}>
                <Button
                  key={id}
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push({
                      pathname: '/tags',
                      query: { id: id },
                    })
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        )*/}
      </div>

      <Typography style={{ paddingTop: 5 }}>
        <span>Posted by </span>
        <Link
          href={{
            pathname: '/user',
            query: { id: userId }
          }}
        >
          <a className={classes.nameLink}>{display}</a>
        </Link>
        <span> on </span>
        <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
      </Typography>

      {/*showDetails && (
        <>
          <TableCell>{answers.length}</TableCell>
          <CustomTableCell>{views}</CustomTableCell>
        </>
      )*/}
    </div>
  );
};

export default withRouter(withStyles(styles)(ListItem));
