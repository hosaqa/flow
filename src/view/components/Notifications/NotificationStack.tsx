import React from 'react';
import styled from 'view/theme';
import NotificationItem from './NotificationItem';
import { INotification, hideNotificationOpts } from './Notifications.interface';

interface INotificationStack {
  notificationsList: Array<INotification>;
  hideNotification({}: hideNotificationOpts): void;
}

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

const NotificationStack: React.FC<INotificationStack> = ({
  notificationsList,
  hideNotification,
}) => (
  <NotificationList>
    {notificationsList.map(notificationItem => {
      const { ID, text, variant, timeout } = notificationItem;

      return (
        <NotificationItem
          ID={ID}
          key={ID}
          message={text}
          variant={variant}
          timeout={timeout}
          hideNotification={hideNotification}
        />
      );
    })}
  </NotificationList>
);

export default NotificationStack;
