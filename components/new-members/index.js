import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '../Avatar';

import Error from '../ErrorMessage';
import { INTROS_QUERY } from '../posts';

const Container = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  padding: 2rem 0;
  overflow: hidden;
`;
const MemeberInfoContainer = styled.div`
  display: flex;
  margin: 0px 10px 0px 10px;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const IndyMemeberInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  cursor: pointer;
`;

const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

class NewMembers extends Component {
  render() {
    const filter = 'all';
    return (
      <Query
        query={INTROS_QUERY}
        variables={{
          filter: filter,
          first: 6
        }}
      >
        {({ data: { introes }, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          return (
            <Container>
              <Card>
                <CardContent>
                  <MemeberInfoContainer>
                    {introes &&
                      introes.map(introes => {
                        return (
                          <Link
                            href={{
                              pathname: '/intro-post',
                              query: { id: introes.id }
                            }}
                            key={introes.id}
                          >
                            <IndyMemeberInfo>
                              <Avatar me={introes.postedBy[0]} small sho />
                              <Typography
                                style={{ fontWeight: 600 }}
                                variant="body2"
                              >
                                {introes.postedBy[0].display}
                              </Typography>
                              <Typography variant="caption">
                                {format(
                                  parseISO(introes.createdAt),
                                  'MMMM dd, yyyy'
                                )}
                              </Typography>
                            </IndyMemeberInfo>
                          </Link>
                        );
                      })}
                  </MemeberInfoContainer>
                </CardContent>
                <BottomButton>
                  <Link
                    href={{
                      pathname: '/posts'
                    }}
                  >
                    <Button size="small" color="primary">
                      Welcome New Members
                    </Button>
                  </Link>
                </BottomButton>
              </Card>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default NewMembers;
