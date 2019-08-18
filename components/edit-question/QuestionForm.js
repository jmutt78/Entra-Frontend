import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import CreateTag from '../create-question/CreateTag.js'
import questionListQuery from '../question-list/questionListQuery'
import { TAGS_QUERY } from '../create-question/Tags'

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  inputField: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    marginLeft: 10,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 500,
    padding: '50px 0 0 0',
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0,
  },
  formControl: {
    width: '100%',
  },
  tagsContainer: {
    display: 'flex',
  },
  tagButton: {
    marginLeft: 10,
    background: '#e3e3e3',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
})

// const styles = theme => ({
//   grid: {
//     margin: theme.spacing.unit
//   },
//   container: {
//     display: "flex"
//   },
//   flex1: {
//     flex: 1
//   },
//   root: {
//     margin: theme.spacing.unit,
//     marginTop: 40
//   },
//   inputField: {
//     width: 700,
//     marginBottom: 30
//   },
//   addNewTag: {
//     marginTop: -15,
//     marginBottom: 30
//   },
//   label: {
//     marginLeft: 10,
//     marginBotom: 10
//   },
//   postQuestionButton: {
//     alignItems: "flex-end"
//   }
// });

const UPDATE_QUESTION_MUTATION = gql`
  mutation updateQuestion(
    $id: ID!
    $title: String!
    $description: String
    $tags: [TagInput!]!
    $approval: Boolean
  ) {
    updateQuestion(id: $id, title: $title, description: $description, tags: $tags, approval: $approval) {
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

class QuestionForm extends React.Component {
  state = {
    showCreateTagModal: false,
    title: this.props.question.title,
    description: this.props.question.description,
    tags: this.props.question.tags.map(tag => tag.name),
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

  updateForm = async (e, updateQuestion) => {
    e.preventDefault()
    const res = await updateQuestion({
      variables: {
        id: this.props.question.id,
        approval: null,

        ...this.state,
        tags: this.state.tags.map(tag => ({
          name: tag,
        })),
      },
    })

    console.log('Updated!!')
    Router.push({
      pathname: '/question',
      query: { id: this.props.question.id },
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
              mutation={UPDATE_QUESTION_MUTATION}
              refetchQueries={[
                {
                  query: questionListQuery,
                  variables: { filter: 'my' },
                },
              ]}
            >
              {(updateQuestion, { error, loading }) => {
                return (
                  <Grid container className={classes.container}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="display3" className={classes.title}>
                              Edit question
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>

                    <div className={classes.formContainer}>
                      <form
                        method="post"
                        onSubmit={e => this.updateForm(e, updateQuestion)}
                        className={classes.form}
                      >
                  <fieldset disabled={loading} aria-busy={loading} className={classes.fieldset}>
                    <FormControl className={classes.formControl}>
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

                  <FormControl className={classes.formControl}>
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

                  <FormControl className={classes.formControl}>
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

                  <CreateTag open={showCreateTagModal} onClose={this.closeCreateTagModal} />

                  <div className={classes.buttonContainer}>
                    <Button variant="contained" type="submit">
                      Post Question
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
                    <div style={{ color: 'red' }}>
                      {error && error.message.replace('GraphQL error: ', '')}
                    </div>
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

export default withStyles(styles)(QuestionForm)
