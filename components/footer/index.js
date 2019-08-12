import Link from 'next/link'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const styles = ({ palette }) => ({
  footerBarContainer: {
    display: 'flex',
    backgroundColor: '#F2F4EF',
  },
  creditBarContainer: {
    background: palette.accent.dark,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#85BDCB',
    display: 'block',
    fontSize: 17,
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
  },
  bottomText: {
    color: '#85BDCB',
    fontSize: 18,
    padding: '1.5rem 2rem',
  },
  menu: {
    color: '#grey',
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
      <Typography variant="h3" className={classes.bottomText}>
        &copy; Copyright {new Date().getFullYear()} Entra
      </Typography>
    </Grid>
  )
}

const FooterBar = ({ classes }) => {
  return (
    <Grid container className={classes.footerBarContainer}>
      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          LEGAL
        </Typography>

        <List component="nav">
          <ListItem>
            <Typography className={classes.menu}>Terms and Conditions</Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.menu}>GDPR Privacy Policy</Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={3} className={classes.grid}>
        <Typography color="secondary" className={classes.text}>
          COMMUNITY
        </Typography>

        <List component="nav">
          <ListItem>
            <Typography className={classes.menu}>
              <Link href="/blogs">
                <a>Blog</a>
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography className={classes.menu}>Our Team</Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={3} className={classes.grid}>
        <Typography variant="h3" className={classes.text}>
          CONNECT WITH US
        </Typography>
        <List component="nav">
          <ListItem>
            <a href="https://www.facebook.com/Entra-463274424415901">
              <img className={classes.img} src="static/icons8-facebook-circled-48.png" />
            </a>
            <a href="https://www.instagram.com/entra.io/">
              <img className={classes.img} src="static/icons8-instagram-old-50.png" />
            </a>
            <a href="https://www.linkedin.com/company/entraio/about">
              <img className={classes.img} src="static/icons8-linkedin-48.png" />
            </a>
            <a href="https://www.linkedin.com/company/entraio/about">
              <img className={classes.img} src="static/icons8-twitter-squared-48.png" />
            </a>
          </ListItem>
        </List>
      </Grid>
    </Grid>
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
