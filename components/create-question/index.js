import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import FilledInput from '@material-ui/core/FilledInput'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import CreateTag from './CreateTag'
import { TAGS_QUERY } from './Tags'

const styles = theme => ({
  // grid: {
  //   margin: theme.spacing.unit
  // },
  // container: {
  //   display: "flex"
  // },
  // flex1: {
  //   flex: 1
  // },
  // root: {
  //   margin: theme.spacing.unit,
  //   marginTop: 40
  // },
  inputField: {
    width: 700,
    marginBottom: 30,
  },
  // addNewTag: {
  //   marginTop: -15,
  //   marginBottom: 30
  // },
  label: {
    marginLeft: 10,
    marginBotom: 10,
  },
  // postQuestionButton: {
  //   alignItems: "flex-end"
  // }
})

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion($title: String!, $description: String, $tags: [TagInput!]!) {
    createQuestion(title: $title, description: $description, tags: $tags) {
      id
      title
      tags {
        id
        name
      }
      id
    }
  }
`

class CreateQuestion extends React.Component {
  state = {
    showCreateTagModal: false,
    title: '',
    description: '',
    tags: [],
  }
  openCreateTagModal = () => {
    this.setState({ showCreateTagModal: true })
  }
  closeCreateTagModal = () => {
    this.setState({ showCreateTagModal: false })
  }
  handleTitleChange = e => {
    this.setState({
      title: e.target.value,
    })
  }
  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value,
    })
  }
  handleTagsChange = e => {
    this.setState({
      tags: e.target.value,
    })
  }
  render() {
    const { classes } = this.props
    const { title, description, tags, showCreateTagModal } = this.state
    return (
      <Query query={TAGS_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          return (
            <Mutation
              mutation={CREATE_QUESTION_MUTATION}
              variables={{
                title,
                description,
                tags: tags.map(tag => ({ name: tag })),
              }}
            >
              {(createQuestion, { error, loading }) => {
                return (
                  <Grid container>
                    <form
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault()
                        const res = await createQuestion()

                        Router.push({
                          pathname: '/question',
                          query: { id: res.data.createQuestion.id },
                        })

                        this.setState({
                          title: '',
                          description: '',
                          tags: [],
                        })
                      }}
                    >
                      <fieldset
                        disabled={loading}
                        aria-busy={loading}
                        style={{
                          borderWidth: '0px',
                        }}
                      >
                        <div>
                          <div>
                            <h1>Ask a question</h1>
                          </div>
                          <div>
                            <FormControl>
                              <label htmlFor="title">
                                <TextField
                                  label="Title"
                                  type="text"
                                  name="title"
                                  variant="filled"
                                  value={title}
                                  onChange={this.handleTitleChange}
                                  className={classes.inputField}
                                />
                              </label>
                            </FormControl>

                            <FormControl variant="filed" className={classes.inputField}>
                              <InputLabel htmlFor="tags" className={classes.label}>
                                Tag(s)
                              </InputLabel>
                              <Select
                                multiple
                                value={tags}
                                name="tags"
                                onChange={this.handleTagsChange}
                                input={<FilledInput name="tab" id="filled-age-native-simple" />}
                                renderValue={selected => selected.join(', ')}
                              >
                                {data.tags.map(tag => (
                                  <MenuItem key={tag.name} value={tag.name}>
                                    <Checkbox checked={this.state.tags.indexOf(tag.name) > -1} />
                                    <ListItemText primary={tag.name} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Button
                              variant="text"
                              onClick={this.openCreateTagModal}
                              className={classes.addNewTag}
                            >
                              ADD NEW TAG
                            </Button>
                            <FormControl>
                              <label htmlFor="description">
                                <TextField
                                  label="Description"
                                  type="text"
                                  name="description"
                                  variant="filled"
                                  multiline
                                  rows={4}
                                  value={description}
                                  onChange={this.handleDescriptionChange}
                                  className={classes.inputField}
                                />
                              </label>
                            </FormControl>
                          </div>
                          <CreateTag open={showCreateTagModal} onClose={this.closeCreateTagModal} />
                          <div className={classes.container}>
                            <div className={classes.flex1}>
                              <Button variant="contained" type="submit">
                                Post Question
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </Grid>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CreateQuestion)
