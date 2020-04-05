import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import NotificationsContext from './NotificationsContext';
import NotificationStack from './NotificationStack';

const NotificationsProvider = ({ children, maxStack = 3 }) => {
  const [notificationsState, setNotificationsState] = useState([]);
  const timeoutList = useRef([]);

  const showNotification = ({ text, variant, timeout }) => {
    const notificationsCount = notificationsState.length;

    const ID = uuidv4();

    const nextNotificationsState = [...notificationsState];

    if (notificationsCount === maxStack) nextNotificationsState.shift();

    setNotificationsState([
      ...nextNotificationsState,
      { ID, text, variant, timeout },
    ]);
  };

  const hideNotification = (ID, timeout) => {
    const hide = () => {
      const notification = notificationsState.find(
        notificationItem => notificationItem.ID === ID
      );

      const notificationIndex = notificationsState.indexOf(notification);

      const nextNotificationsState = [...notificationsState];
      nextNotificationsState.splice(notificationIndex, 1);

      setNotificationsState(nextNotificationsState);

      if (timeoutList.current[ID])
        timeoutList.current.splice(notificationIndex, 1);
    };

    if (timeout && 1 === 2) {
      if (!timeoutList.current[ID]) {
        let t = setTimeout(hide, timeout);
        timeoutList.current.push(t);
      }
    } else {
      hide();
    }
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
      {notificationsState.length > 0 &&
        createPortal(
          <NotificationStack
            hideNotification={hideNotification}
            notificationsList={notificationsState}
          />,
          document.getElementById('popup-root')
        )}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  maxStack: PropTypes.number,
};

export default NotificationsProvider;
