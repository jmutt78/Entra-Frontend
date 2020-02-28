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

const Container = styled.div`
  padding: 1rem 1rem 0 0;
  background-color: transparent;
  scroll: disabled;

  margin: 0;
  list-style: none;
  display: flex;
  overflow: hidden;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  overflow: hidden;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Items = styled.div`
  color: #6f6f6f;
  font-size: 12px;
  padding: 2px;
  font-weight: 200;
`;

const Copy = styled.div`
  color: #6f6f6f;
  display: block;
  font-weight: 200;
  font-size: 10px;
  text-transform: uppercase;
  margin-top: 10px;
`;

const footerLinks = [
  {
    name: 'Terms and Conditions  • ',
    link: 'terms'
  },
  {
    name: 'Privacy Policy  • ',
    link: 'privacy'
  },
  {
    name: 'Our Why  • ',
    link: '"why"'
  },
  {
    name: 'Help  • ',
    link: 'https://entra.drift.help/'
  },
  {
    name: 'Instagram  • ',
    link: 'https://www.instagram.com/entra.io/'
  },
  {
    name: 'Facebook  • ',
    link: 'https://www.facebook.com/Entra-463274424415901'
  },
  {
    name: 'Linkedin • ',
    link: 'https://www.linkedin.com/company/entraio/about'
  },
  {
    name: 'Twitter',
    link: 'https://www.twitter.com/entraio'
  }
];

export default function NewMembers() {
  return (
    <div>
      <Container>
        {footerLinks.map(({ name, link }) => (
          <Items key={name}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </Items>
        ))}
      </Container>
      <Copy>&copy; Copyright {new Date().getFullYear()} Entra</Copy>
    </div>
  );
}
