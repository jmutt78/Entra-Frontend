import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import './footer.css';

const styles = ({ palette }) => ({
  creditBarContainer: {
    background: '#2d3436',
    display: 'flex',
    justifyContent: 'center'
  },
  creditBarText: {
    color: '#85bdcb', //palette.accent.blue,
    padding: '1.5rem 2rem',
    fontSize: 18,
    fontWeight: 'bold'
  },
  paddingLeft: {
    width: '10vw'
  },
  paddingRight: {
    width: '6vw'
  },
  listItem: {
    padding: '0.8rem 0'
  },

  heading: {
    color: '#85bdcb', //palette.accent.blue,
    fontSize: 17,
    fontWeight: 'bold'
  },
  link: {
    fontSize: 16,
    color: '#2d3436',
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      color: '#85bdcb' //palette.accent.blue,
    }
  },
  img: {
    marginRight: 15,
    width: 30,
    color: 'grey'
  }
});

export const CreditBar = ({ classes }) => {
  return (
    <div className={classes.creditBarContainer}>
      <Typography color="secondary" className={classes.creditBarText}>
        &copy; Copyright {new Date().getFullYear()} Entra
      </Typography>
    </div>
  );
};

export const FooterBar = ({ classes }) => {
  return (
    <div className="footerBarContainer">
      <div className={classes.paddingLeft} />

      <div className="footerSection">
        <Typography color="secondary" className={classes.heading}>
          LEGAL
        </Typography>

        <List component="nav">
          <ListItem className={classes.listItem}>
            <Typography>
              <Link href="/terms">
                <span className={classes.link}>Terms and Conditions</span>
              </Link>
            </Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Typography>
              <Link href="/privacy">
                <span className={classes.link}>GDPR Privacy Policy</span>
              </Link>
            </Typography>
          </ListItem>
        </List>
      </div>

      <div className="footerSection">
        <Typography color="secondary" className={classes.heading}>
          COMMUNITY
        </Typography>

        <List component="nav">
          <ListItem className={classes.listItem}>
            <Typography>
              <Link href="/blog">
                <span className={classes.link}>Blog</span>
              </Link>
            </Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Typography>
              <Link href="/why">
                <span className={classes.link}>Our Why</span>
              </Link>
            </Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Typography>
              <a
                href="https://entra.drift.help/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Help
              </a>
            </Typography>
          </ListItem>
        </List>
      </div>

      <div className="footerSection">
        <Typography color="secondary" className={classes.heading}>
          CONNECT WITH US
        </Typography>

        <List component="nav">
          <ListItem className={classes.listItem}>
            <a
              href="https://www.facebook.com/Entra-463274424415901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.img}
                src="/static/icons8-facebook-circled-48.png"
                alt="facebook icon"
              />
            </a>
            <a
              href="https://www.instagram.com/entra.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.img}
                src="/static/icons8-instagram-old-50.png"
                alt="instagram icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/entraio/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.img}
                src="/static/icons8-linkedin-48.png"
                alt="linkedin icon"
              />
            </a>
            <a
              href="https://www.twitter.com/entraio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.img}
                src="/static/icons8-twitter-squared-48.png"
                alt="twitter icon"
              />
            </a>
          </ListItem>
        </List>
      </div>
      <div className={classes.paddingRight} />
    </div>
  );
};

const Footer = ({ classes }) => {
  return (
    <>
      <FooterBar classes={classes} />
      <CreditBar classes={classes} />
    </>
  );
};

export default withStyles(styles)(Footer);
