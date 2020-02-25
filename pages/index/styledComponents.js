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
