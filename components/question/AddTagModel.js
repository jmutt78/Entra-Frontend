import React from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Error from "./../ErrorMessage.js";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ADD_TAG_MUTATION = gql`
  mutation ADD_TAG_MUTATION(
    $name: String!
  ) {
    createTag(name: $name) {
        name
    }
  }
`;

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        maxWidth: 200,
        alignSelf: 'flex-end'
    },
});

class AddTagModel extends React.Component {
    state = {
        open: false,
        tagName: ''
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    test = (data) => {
        console.log(data);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen}>
                    Add Tag
                        </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Mutation mutation={ADD_TAG_MUTATION}>
                        {(addTag, { data, error }) => (
                            <div style={getModalStyle()} className={classes.paper}>
                                <Error error={error} />

                                <Typography variant="h6" id="modal-title">Add new tag</Typography>
                                <TextField
                                    id="standard-name"
                                    label="Name"
                                    name="tagName"
                                    className={classes.textField}
                                    value={this.state.tagName}
                                    onChange={this.saveToState}
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" className={classes.button} onClick={e => {
                                    e.preventDefault();

                                    addTag({ variables: { name: this.state.tagName } });
                                    this.setState({
                                        open: false,
                                        tagName: "",
                                    });
                                }}>
                                    Add Tag
                                </Button>
                            </div>
                        )}
                    </Mutation>
                </Modal>
            </div>
        );
    }
}

AddTagModel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const AddTagModelWrapped = withStyles(styles)(AddTagModel);

export default AddTagModelWrapped;