const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY($searchTerm: String!) {
    title: questions(where: { title_contains: $searchTerm }) {
      id
      title
      description
    }
    description: questions(where: { description_contains: $searchTerm }) {
      id
      title
      description
    }
  }
`;
