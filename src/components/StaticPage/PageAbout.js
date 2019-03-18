import React from 'react';
import {StaticPage, Title, Paragraph, ExternalLink, MarkedList, MarkedListItem} from './index';

const PageAbout = () => (
    <StaticPage>
      <Title>About</Title>
      <Paragraph>
        Music streaming app. Non-commercial project.
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
        TODO:
      </Paragraph>
      <MarkedList>
        <MarkedListItem>Express Rest API</MarkedListItem>
        <MarkedListItem>make responsive</MarkedListItem>
        <MarkedListItem>authentication</MarkedListItem>
        <MarkedListItem>sorting tracks by genre and artist</MarkedListItem>
        <MarkedListItem>track search</MarkedListItem>
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
