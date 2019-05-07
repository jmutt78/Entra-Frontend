import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import Error from "./../ErrorMessage.js";
import QuestionsDisplay from "./QuestionsDisplay";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
    grid: {
        margin: theme.spacing.unit
    },
    root: {
        margin: theme.spacing.unit,
        marginTop: 40
    }
});

class DisplayQuestion extends Component {
    render() {
        return (
            <Query query={CURRENT_USER_QUERY}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;

                    return (
                        <>
                            <Error error={error} />
                            
                            <QuestionsDisplay questions={data.me.myQuestions} />
                        </>
                    );
                }}
            </Query>
        );
    }
}

DisplayQuestion.propTypes = {
};

export default withStyles(styles)(DisplayQuestion);