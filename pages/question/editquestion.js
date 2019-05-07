import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../components/auth/User";
import PleaseSignIn from "../../components/auth/PleaseSignIn";
import DisplayEditQuestion from "../../components/question/DisplayEditQuestion";

const EditQuestion = props => (
    <div>
        <PleaseSignIn>
            <Query query={CURRENT_USER_QUERY}>
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (!data.me) return <></>

                    let question = data.me.myQuestions.filter(question => question.id == props.query.id).shift() || {};
                    return <DisplayEditQuestion question={question} />
                }}
            </Query>
        </PleaseSignIn>
    </div>
);

export default EditQuestion;
