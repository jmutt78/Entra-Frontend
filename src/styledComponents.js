import styled from 'styled-components';

export const QuestionListContainer = styled.div`
  display: flex;
  flex-flow: column;
  /* min-width: 1200px; */
  min-width: 99.7%;
  max-height: 100vh;
  padding-right: 10px;
  margin-left: 20px;
  overflow: hidden;
  ul {
    overflow: scroll;
    margin: 0px;
  }
  @media (max-width: 767px) {
    padding-right: 0;
    margin-left: 0;
    ul {
      overflow: scroll;
      padding: 0;
    }
  }
`;
