import casual from "casual";

// seed it so we get consistent results
casual.seed(777);

const fakeUser = () => ({
  __typename: "User",
  id: "4234",
  name: casual.name,
  email: casual.email,
  display: casual.display,
  location: casual.location,
  about: casual.about,
  industry: casual.industry,
  image:
    "https://res.cloudinary.com/docusite/image/upload/v1564232880/EntraAccountPhoto/s5bmseqgwzkdf98hpvey.jpg",
  permissions: ["ADMIN"],
  myQuestions: fakeQuestion(),
  myAnswers: fakeAnswer(),
  myBookMarks: fakeBookmark()
});

const fakeQuestion = () => ({
  __typename: "Question",
  id: "4234",
  title: casual.title,
  description: casual.description,
  askedBy: fakeUser(),
  approval: true,
  answers: fakeAnswer(),
  downVotes: 3,
  upVotes: 4,
  views: 10
});

const fakeAnswer = () => ({
  __typename: "Answer",
  id: "4234",
  body: casual.body,
  answeredBy: fakeUser(),
  answeredTo: fakeQuestion(),
  approval: true,
  downVotes: 3,
  upVotes: 4,
  views: 10
});

const fakeTag = () => ({
  __typename: "Tag",
  id: "4234",
  tag: casual.tag
});

const fakeBookmark = () => ({
  __typename: "BookMark",
  id: "4234",
  questions: fakeQuestion(),
  markedBy: fakeUser()
});

const fakeAnswerVote = () => ({
  __typename: "AnswerVote",
  id: "4234",
  votedAnswer: fakeAnswer(),
  votedBy: fakeUser(),
  vote: "up"
});

const fakeQuestionVote = () => ({
  __typename: "QuestionVote",
  id: "4234",
  votedQuestion: fakeQuestion(),
  votedBy: fakeUser(),
  vote: "up"
});

const fakeQuestionView = () => ({
  __typename: "QuestionView",
  id: "4234",
  viewedQuestion: fakeQuestion(),
  viewedBy: fakeUser()
});

export {
  fakeUser,
  fakeQuestion,
  fakeAnswer,
  fakeTag,
  fakeBookmark,
  fakeAnswerVote,
  fakeQuestionVote,
  fakeQuestionView
};
