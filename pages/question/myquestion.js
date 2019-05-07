import PleaseSignIn from "../../components/auth/PleaseSignIn";
import DisplayQuestion from "../../components/question/DisplayQuestion";

const Question = props => (
    <div>
        <PleaseSignIn>
            <DisplayQuestion />
        </PleaseSignIn>
    </div>
);

export default Question;
