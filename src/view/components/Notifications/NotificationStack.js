import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import NotificationItem from './NotificationItem';

const NotificationList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  position: fixed;
  z-index: 1000;
  position: fixed;
  left: ${({ theme }) => theme.spacing(3)}px;
  bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const NotificationStack = ({ notificationsList, hideNotification }) => (
  <NotificationList>
    {notificationsList.map((notificationItem, index) => {
      const { ID, text, variant, timeout } = notificationItem;

      return (
        <NotificationItem
          ID={ID}
          key={ID}
          message={text}
          variant={variant}
          timeout={timeout}
          index={index}
          hideNotification={hideNotification}
          role="alert"
        />
      );
    })}
  </NotificationList>
);

NotificationStack.propTypes = {
  notificationsList: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      variant: PropTypes.string,
      timeout: PropTypes.number,
    })
  ),
  hideNotification: PropTypes.func.isRequired,
};

export default NotificationStack;
