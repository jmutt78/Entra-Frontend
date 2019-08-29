import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "@material-ui/core/Button"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

import { perPage } from "../../config.js"

const styles = ({ palette }) => ({
  container: {
    flexShrink: 0,
    color: palette.text.secondary,
    marginLeft: "1.8rem"
  },
  button: {
    margin: 5,
    backgroundColor: "#b2bec3",
    "&:hover": {
      backgroundColor: palette.primary.main
    }
  }
})

function PaginationActions({ classes, page, pages }) {
  const { pathname, query } = useRouter()
  return (
    <Typography className={classes.container}>
      <Link
        prefetch
        href={{
          pathname,
          query: { ...query, page: page - 1 }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={page <= 1 ? { display: "none" } : {}}
          size="small"
        >
          <KeyboardArrowLeft />
          {`Previous Page `}
        </Button>
      </Link>

      <Link
        prefetch
        href={{
          pathname,
          query: { ...query, page: page + 1 }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={page >= pages ? { display: "none" } : {}}
          size="small"
        >
          {` Next Page`}
          <KeyboardArrowRight />
        </Button>
      </Link>
    </Typography>
  )
}

export default withStyles(styles)(PaginationActions)
