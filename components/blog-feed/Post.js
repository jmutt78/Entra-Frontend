import Link from 'next/link'
import React from 'react'
import { format, parseISO } from 'date-fns'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    maxWidth: 1000,
    margin: theme.spacing(5),
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    width: '3.8rem',
    height: '3.8rem',
  }
})

const titleProps = {
  style: {
    fontSize: '1.8rem',

  }
}
const dateProps = {
  style: {
    fontSize: '1.1rem',

  }
}

const Post = ({ post, classes }) => {
  return (
    <div key={post.node.id}>
      <Link
        href={{
          pathname: '/post',
          query: { id: post.node.id },
        }}
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar aria-label="Recipe" className={classes.avatar} src="/static/square_logo.png" />}
            title={post.node.title}
            subheaderTypographyProps={dateProps}
            titleTypographyProps={titleProps}
            subheader={format(parseISO(post.node.date), 'MMMM dd, yyyy')}
          />
          <CardMedia
            className={classes.media}
            image={post.node.featuredImage.sourceUrl}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.node.excerpt,
                }}
              />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Read More
            </Button>
          </CardActions>
        </Card>
      </Link>
    </div>
  )
}

export default withStyles(styles)(Post)
