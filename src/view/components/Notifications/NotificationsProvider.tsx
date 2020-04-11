import React, { useState, useRef, memo, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  showNotificationOpts,
  hideNotificationOpts,
  INotification,
} from './Notifications.interface';
import NotificationsContext from './NotificationsContext';
import NotificationStack from './NotificationStack';

interface INotificationsProvider {
  children?: ReactNode;
  maxStack?: number;
}

type timeoutListType = {
  [key: string]: number;
};

const NotificationsProvider: React.FC<INotificationsProvider> = ({
  children,
  maxStack = 3,
}) => {
  const DOMNode = useMemo(() => {
    return document.getElementById('popup-root');
  }, []);

  const [notificationsState, setNotificationsState] = useState<INotification[]>(
    []
  );

  const timeoutList = useRef<timeoutListType>(null);

  const showNotification = ({
    text,
    variant,
    timeout,
  }: showNotificationOpts) => {
    const notificationsCount = notificationsState.length;

    const ID = uuidv4();

    const nextNotificationsState = [...notificationsState];

    if (notificationsCount === maxStack) nextNotificationsState.shift();

    const notification = { ID, text, variant, timeout };

    setNotificationsState([...nextNotificationsState, notification]);
  };

  const hideNotification = ({ ID, timeout }: hideNotificationOpts) => {
    const removeNotification = () => {
      setNotificationsState(notificationsState => {
        const notification = notificationsState.find(
          notificationItem => notificationItem.ID === ID
        );

        const notificationIndex = notificationsState.indexOf(notification!);

        const nextNotificationsState = [...notificationsState];
        nextNotificationsState.splice(notificationIndex, 1);

        if (timeoutList.current![ID]) {
          delete timeoutList.current![ID];
        }

        return nextNotificationsState;
      });
    };

    if (timeout) {
      if (!timeoutList.current![ID]) {
        timeoutList.current![ID] = window.setTimeout(
          removeNotification,
          timeout
        );
      }
    } else {
      removeNotification();
    }
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
      {notificationsState.length > 0 &&
        DOMNode &&
        createPortal(
          <NotificationStack
            hideNotification={hideNotification}
            notificationsList={notificationsState}
          />,
          DOMNode
        )}
    </NotificationsContext.Provider>
  );
};

export default memo(NotificationsProvider);
