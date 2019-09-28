import React from 'react';
import { withRouter } from 'next/router';

import { withStyles } from '@material-ui/core/styles';

import './index.css';

const styles = ({ layout, palette, spacing }) => ({
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

const QuestionDetail = ({
  item: { id, description, createdAt, tags, askedBy },
  router,
  userName,
  question,
  classes,
  user
}) => {
  if (!description) return null;

  return (
    <div className="QuestionDetail-body">
      <div className={classes.bodyText}>{description}</div>
    </div>
  );
};

// {[><PromptBar classes={classes} user={user} /><]}

export default withRouter(withStyles(styles)(QuestionDetail));
