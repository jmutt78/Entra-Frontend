import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const HeroSignupButton = styled.button`
  cursor: pointer;
  width: 300px;
  height: 3.5rem;
  max-width: 90%;
  border: none;
  border-radius: 100px;
  background: #e27d60;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const HeroSignupButtonText = styled(Typography)`
  color: white;
  font-weight: 500 !important;
`;

export const SectionBreak = styled.hr`
  width: 90%;
  margin-top: 2.2rem;

  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;

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

export const VoteContainer = styled.div`
  padding: 0 15px 0 0;
  align-items: center;
  float: left;

  @media (max-width: 500px) {
    padding: 0 10px 0 0;
  }
`;
