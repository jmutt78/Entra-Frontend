import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import './footer.css'

const styles = ({ palette }) => ({
  creditBarContainer: {
    background: palette.accent.dark,
    display: 'flex',
    justifyContent: 'center',
  },
  creditBarText: {
    color: palette.accent.blue,
    padding: '1.5rem 2rem',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paddingLeft: {
    width: '10vw',
  },
  paddingRight: {
    width: '6vw',
  },
  listItem: {
    padding: '0.8rem 0',
  },

  heading: {
    color: palette.accent.blue,
    fontSize: 17,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: palette.accent.dark,
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      color: palette.accent.blue,
    },
  },
  img: {
    marginRight: 15,
    width: 30,
    color: 'grey',
  },
})

const CreditBar = ({ classes }) => {
  return (
    <div className={classes.creditBarContainer}>
      <Typography color="secondary" className={classes.creditBarText}>
        &copy; Copyright {new Date().getFullYear()} Entra
      </Typography>
    </div>
  )
}

const FooterBar = ({ classes }) => {
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
              <Link href="/team">
                <span className={classes.link}>Our Team</span>
              </Link>
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
              <img className={classes.img} src="/static/icons8-facebook-circled-48.png" />
            </a>
            <a href="https://www.instagram.com/entra.io/" target="_blank" rel="noopener noreferrer">
              <img className={classes.img} src="/static/icons8-instagram-old-50.png" />
            </a>
            <a
              href="https://www.linkedin.com/company/entraio/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.img} src="/static/icons8-linkedin-48.png" />
            </a>
            <a
              href="https://www.twitter.com/entraio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.img} src="/static/icons8-twitter-squared-48.png" />
            </a>
          </ListItem>
        </List>
      </div>
      <div className={classes.paddingRight} />
    </div>
  )
}

const Footer = ({ classes }) => {
  return (
    <>
      <FooterBar classes={classes} />
      <CreditBar classes={classes} />
    </>
  )
}

export default withStyles(styles)(Footer)
