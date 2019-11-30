const fakeQuestion = {
  __typename: 'Question',
  answers: [],
  approval: true,
  askedBy: [],
  bookMark: [],
  createdAt: '2019-11-08T08:20:54.504Z',
  description: '',
  downVotes: 3,
  id: '5dc525660274390007608a12',
  searchTermFoundIn: 'Question',
  tags: [],
  title: 'test1',
  upVotes: 6,
  views: 9
};

const fakeAnswer = {
  __typename: 'Answer',
  body: 'answer test 1',
  id: '5db293ee857aba00085589c9'
};

const fakeAskedby = {
  __typename: 'User',
  display: 'userTest1',
  id: '5db289a3857aba00085589b6',
  name: 'ut1'
};

const fakeBookmark = {
  __typename: 'BookMark',
  id: '5ddbdd360274390007608a2f'
};

const fakseTags = {
  __typename: 'Tag',
  id: '5db29080857aba00085589bb',
  name: 'testTag1'
};

export { fakeQuestion, fakseTags, fakeBookmark, fakeAskedby, fakeAnswer };
