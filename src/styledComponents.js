import styled from 'styled-components';

export const QuestionListContainer = styled.div`
  display: flex;
  flex-flow: column;
  /* min-width: 1200px; */
  min-width: 99.7%;
  padding-right: 10px;
  margin-left: 20px;
  ul {
    overflow: auto;
    margin: 0px;
  }
  @media (max-width: 767px) {
    padding-right: 0;
    margin-left: 0;
    ul {
      padding: 0;
    }
  }
`;
