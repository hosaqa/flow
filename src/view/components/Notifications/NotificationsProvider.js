import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import NotificationsContext from './NotificationsContext';

const NotificationsProvider = ({ children }) => {
  const [notificationsState, setNotificationsState] = useState([]);

  const showNotification = ({ text, variant }) => {
    setNotificationsState([...notificationsState, { text, variant }]);
  };

  const renderNotifications = () => {
    console.log(notificationsState);
    return notificationsState.map((notificationItem, index) => (
      <div key={index}>{notificationItem.text}</div>
    ));
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      {children}
      {notificationsState.length &&
        createPortal(
          renderNotifications(),
          document.getElementById('popup-root')
        )}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  domRoot: PropTypes.string,
};

export default NotificationsProvider;
