import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import './footer.css'

const styles = ({ palette }) => ({
  creditBarContainer: {
    background: palette.accent.dark,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  creditBarText: {
    color: palette.accent.blue,
    fontSize: 18,
    padding: '1.5rem 2rem',
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
  menu: {
    color: palette.accent.dark,
    fontSize: 16,
    cursor: 'pointer',
  },
  img: {
    marginRight: 15,
    width: 30,
    color: 'grey',
  },
})

const CreditBar = ({ classes }) => {
  return (
    <Grid container className={classes.creditBarContainer}>
      <Typography variant="h3" className={classes.creditBarText}>
        &copy; Copyright {new Date().getFullYear()} Entra
      </Typography>
    </Grid>
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
          <ListItem  className={classes.listItem}>
            <Typography className={classes.menu}>
              <Link href="/terms">Terms and Conditions</Link>
            </Typography>
          </ListItem>

          <ListItem  className={classes.listItem}>
            <Typography className={classes.menu}>
              <Link href="/privacy">GDPR Privacy Policy</Link>
            </Typography>
          </ListItem>
        </List>
      </div>

      <div className="footerSection">
        <Typography color="secondary" className={classes.heading}>
          COMMUNITY
        </Typography>

        <List component="nav">
          <ListItem  className={classes.listItem}>
            <Typography className={classes.menu}>
              <Link href="/blog">Blog</Link>
            </Typography>
          </ListItem>

          <ListItem  className={classes.listItem}>
            <Typography className={classes.menu}>
              <Link href="/team">Our Team</Link>
            </Typography>
          </ListItem>
        </List>
      </div>

      <div className="footerSection">
        <Typography color="secondary" className={classes.heading}>
          CONNECT WITH US
        </Typography>

        <List component="nav">
          <ListItem  className={classes.listItem}>
            <a
              href="https://www.facebook.com/Entra-463274424415901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.img} src="static/icons8-facebook-circled-48.png" />
            </a>
            <a href="https://www.instagram.com/entra.io/" target="_blank" rel="noopener noreferrer">
              <img className={classes.img} src="static/icons8-instagram-old-50.png" />
            </a>
            <a
              href="https://www.linkedin.com/company/entraio/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.img} src="static/icons8-linkedin-48.png" />
            </a>
            <a
              href="https://www.linkedin.com/company/entraio/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={classes.img} src="static/icons8-twitter-squared-48.png" />
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
