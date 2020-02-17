import styled from 'styled-components';

export const QuestionListContainer = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 99.3%;
  max-height: 94vh;
  padding-right: 10px;
  margin-left: 20px;
  overflow: hidden;
  ul {
    overflow: scroll;
    margin: 0px;
  }
  @media (max-width: 767px) {
    padding-right: 5px;
    display: flex;
    min-width: 99.7%;
    padding-left: 0px;
    margin-left: 0;
    max-height: 89vh;
    ul {
      overflow: scroll;
      padding: 0;
    }
  }
`;

export const ScrollablePageContainer = styled.div`
  overflow: hidden;
`;
