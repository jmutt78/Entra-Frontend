import Link from "next/link";
import React from "react";
import { format, parseISO } from "date-fns";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./index.css";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    marginTop: "-5px"
  },
  excerpt: {
    fontSize: "1.1rem"
  },
  buttonText: {
    fontSize: "1.1rem",
    cursor: "pointer"
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 15px 15px 0"
  }
});

const titleProps = {
  style: {
    fontSize: "1.8rem"
  }
};
const dateProps = {
  style: {
    fontSize: "1.1rem"
  }
};

const Post = ({ post, classes }) => {
  return (
    <div>
      <Link
        href={{
          pathname: "/post",
          query: { id: post.node.id }
        }}
      >
        <Card className="card">
          <CardHeader
            avatar={
              <div className="postAvatar">
                <Avatar
                  aria-label="Recipe"
                  className={classes.avatarInner}
                  src="/static/square_logo.png"
                />
              </div>
            }
            title={post.node.title}
            subheaderTypographyProps={dateProps}
            titleTypographyProps={titleProps}
            subheader={format(parseISO(post.node.date), "MMMM dd, yyyy")}
            style={{ padding: "30px 15px" }}
          />
          <CardMedia
            className={classes.media}
            image={post.node.featuredImage.sourceUrl}
            title="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.excerpt}
              dangerouslySetInnerHTML={{
                __html: post.node.excerpt
              }}
            ></Typography>
          </CardContent>
          <CardActions>
            <Typography component="div" className={classes.buttonContainer}>
              <Button size="small" color="primary">
                <span className={classes.buttonText}>Read More</span>
              </Button>
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </div>
  );
};

export default withStyles(styles)(Post);
