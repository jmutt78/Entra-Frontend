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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

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
  margin: 0px 5px 0px 5px;
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
  margin: 15px;
  cursor: pointer;
`;

const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
const BadgeTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'rgb(242, 244, 239)',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

export default function NewMembers() {
  const filter = 'all';
  return (
    <Query
      query={INTROS_QUERY}
      variables={{
        filter: filter,
        first: 10
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
                      const me = introes.postedBy[0];
                      return (
                        <Link
                          href={{
                            pathname: '/intro-post',
                            query: { id: introes.id }
                          }}
                          key={introes.id}
                        >
                          <IndyMemeberInfo>
                            {me.image == null || me.image == '' ? (
                              <BadgeTooltip
                                title={
                                  <React.Fragment>
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
                                  </React.Fragment>
                                }
                              >
                                <Avatar>{me.name[0]}</Avatar>
                              </BadgeTooltip>
                            ) : (
                              <BadgeTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      style={{
                                        fontWeight: 600,
                                        color: '#e27d60'
                                      }}
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
                                  </React.Fragment>
                                }
                              >
                                <Avatar alt="Remy Sharp" src={me.image} />
                              </BadgeTooltip>
                            )}
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
