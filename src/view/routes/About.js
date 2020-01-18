import React from 'react';
import ReactGA from 'react-ga';
import {
  TitleLarge,
  Paragraph,
  ExternalLink,
} from '../components/UI/Typography';
import { MarkedList, MarkedListItem } from '../components/UI/Lists';
import TextPageLayout from '../pageLayouts/TextPageLayout';

ReactGA.pageview('/about');

const PageAbout = () => (
  <TextPageLayout>
    <TitleLarge>About</TitleLarge>
    <Paragraph>
      This is my pet project, web application for music streaming.
    </Paragraph>
    <Paragraph>
      Technology stack: react, redux, react-howler, emotion.
    </Paragraph>
    <Paragraph>
      <ExternalLink href="https://github.com/hosaqa/flow" target="_blank">
        Github
      </ExternalLink>
      ,{' '}
      <ExternalLink
        href="https://www.figma.com/file/gzkNkaDIEGVbrIQW8QIMr48B/Flow-UI-kit-v1.0?node-id=338%3A177"
        target="_blank"
      >
        UI-kit
      </ExternalLink>
    </Paragraph>
    <Paragraph>To do:</Paragraph>
    <MarkedList>
      <MarkedListItem>ability to create your own profile</MarkedListItem>
      <MarkedListItem>ability to look up the track</MarkedListItem>
    </MarkedList>
    <Paragraph>
      Contact with me:{' '}
      <ExternalLink href="https://t.me/qwertyxz" target="_blank">
        telegram
      </ExternalLink>
      ,{' '}
      <ExternalLink
        href="https://www.facebook.com/people/Roman-Ischuk/100014819144289"
        target="_blank"
      >
        fb
      </ExternalLink>
      ,{' '}
      <ExternalLink href="https://www.linkedin.com/in/hosaqa/" target="_blank">
        linkedin
      </ExternalLink>
    </Paragraph>
  </TextPageLayout>
);

export default PageAbout;
