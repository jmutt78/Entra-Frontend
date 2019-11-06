import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import { Mixpanel } from '../../utils/Mixpanel';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem'
  },

  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center'
  }
});

class Welcome extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Welcome To Entra!
          </Typography>

          <div>A Note from our founder-</div>
          <div>
            When I was starting out in business, it was tough to find a
            community of people to advise me on what to do. I had to rely on the
            few mentors in my life (mostly my father).{' '}
          </div>
          <br></br>
          <div>
            When I gained some experience and became more seasoned, I made it my
            priority to help other entrepreneurs in their journey.{' '}
          </div>
          <br></br>
          <div>
            Entra is a place for entrepreneurs to show off their expertise, help
            other people, and strengthen our community. This is something I wish
            I’d had when starting out and why I’m excited to share it with you.
          </div>
          <div>-Justin McIntosh, CEO</div>
          <Typography variant="h6" className={classes.title}>
            Watch the video below to learn how to use Entra!
          </Typography>
          <div className="videoWrapper">
            <iframe
              title="video"
              src="//www.youtube.com/embed/3mxnannKu3E"
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        </Grid>
        <Link href="/tag-select">
          <Button
            variant="contained"
            type="button"
            onClick={e => {
              Mixpanel.track('Welcome Next');
            }}
          >
            NEXT
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);