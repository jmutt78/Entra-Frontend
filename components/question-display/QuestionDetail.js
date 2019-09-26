import React from 'react';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import DeleteQuestion from '../delete-question';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

import ApproveQuestion from '../approval/AppoveQuestion.js';

import './index.css';

const styles = ({ layout, palette, spacing }) => ({
  container: {
    padding: '10px 0'
  },
  body: {
    color: '#2d3436', //palette.accent.dark,
    // TODO make this smaller on mobile, 10 - 25 - 50
    padding: '5px 25px 5px 25px',
    margin: 0,
    fontWeight: 300
  },
  bodyText: {
    whiteSpace: 'pre-wrap',
    fontSize: '1rem'
  },
  editButton: {
    backgroundColor: '#85bdcb' //palette.accent.blue,
  }
});

// const promptBarStyles = ({ layout, palette, spacing }) => ({
//   textTop: {
//     color: 'white',
//     fontSize: 20
//   },
//   top: {
//     backgroundColor: '#85BDCB',
//     boxShadow: 'none',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     padding: '20px'
//   },
//   signupButton: {
//     backgroundColor: palette.primary.dark,
//     '&:hover': {
//       backgroundColor: palette.primary.main
//     },
//     marginLeft: 10
//   },
// });

// const PromptBar = withStyles(promptBarStyles)(({ classes, user }) => {
//   return user ? null : (
//     <div className={classes.top} position="static">
//       <Typography className={classes.textTop}>
//         Do you have an Answer? 👉
//       </Typography>
//
//       <Link href="/signup">
//         <Button
//           variant="contained"
//           color="secondary"
//           className={classes.signupButton}
//         >
//           Sign up now
//         </Button>
//       </Link>
//     </div>
//   );
// });

export const EditButton = ({ question, user, classes }) => {
  const answers = question.answers.length;
  const date1 = new Date(question.createdAt);
  const date2 = new Date();
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

  return user &&
    question.askedBy[0].id === user.id &&
    diffDays <= 1 &&
    !answers ? (
    <Typography style={{ paddingBottom: 10 }} component={'div'}>
      <Link
        href={{
          pathname: '/edit-question',
          query: { id: question.id }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.editButton}
        >
          EDIT
        </Button>
      </Link>
      <DeleteQuestion id={question.id} />
    </Typography>
  ) : null;
};

const QuestionDetail = ({
  item: { id, description, createdAt, tags, askedBy },
  router,
  userName,
  question,
  classes,
  user
}) => {
  const hasPermissions =
    !!user &&
    user.permissions.some(permission =>
      ['ADMIN', 'MODERATOR'].includes(permission)
    );
  const isApproved = question.approval === true;

  if (!description) return null;

  return (
    <div className={classes.container}>
      {/*<PromptBar classes={classes} user={user} />*/}

      <div className={classes.body}>
        <div className={classes.bodyText}>{description}</div>
      </div>

      <div style={{ paddingBottom: 10 }}>
        <ApproveQuestion
          hasPermissions={hasPermissions}
          isApproved={isApproved}
          id={question.id}
          approval={question.approval}
        />
      </div>

      <EditButton question={question} user={user} classes={classes} />
    </div>
  );
};

export default withRouter(withStyles(styles)(QuestionDetail));
