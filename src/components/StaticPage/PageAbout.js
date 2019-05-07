import React from 'react';
import ReactGA from 'react-ga';
import {StaticPage, Title, Paragraph, ExternalLink, MarkedList, MarkedListItem} from './index';

ReactGA.pageview('/about');

const PageAbout = () => (
    <StaticPage>
      <Title>About</Title>
      <Paragraph>
        This is my pet project, web application for music streaming.
      </Paragraph>
      <Paragraph>
        Technology stack: react, redux, styled-components.
      </Paragraph>
      <Paragraph>
        <ExternalLink
          href="https://github.com/xhosaka/flow"
          target="_blank"
        >Github
        </ExternalLink>, {' '}
        <ExternalLink
          href="https://www.figma.com/file/gzkNkaDIEGVbrIQW8QIMr48B/Flow-UI-kit-v1.0?node-id=338%3A177"
          target="_blank"
        >
          UI-kit
        </ExternalLink>
      </Paragraph>
      <Paragraph>
        To do:
      </Paragraph>
      <MarkedList>
        <MarkedListItem>Express Rest API</MarkedListItem>
        <MarkedListItem>make responsive layout</MarkedListItem>
        <MarkedListItem>ability to create your own profile</MarkedListItem>
        <MarkedListItem>ability to sort by artists and genres</MarkedListItem>
        <MarkedListItem>ability to look up the track</MarkedListItem>
      </MarkedList>
      <Paragraph>
        Contact with me: {' '}
        <ExternalLink
          href="https://t.me/qwertyxz"
          target="_blank"
        >
          telegram
        </ExternalLink>, {' '}
        <ExternalLink
          href="https://www.facebook.com/people/Roman-Ischuk/100014819144289"
          target="_blank"
        >
          fb
        </ExternalLink>, {' '}
        <ExternalLink
          href="https://www.linkedin.com/in/hosaqa/"
          target="_blank"
        >
          linkedin
        </ExternalLink>
      </Paragraph>
      
    </StaticPage>
  );

export default PageAbout;
