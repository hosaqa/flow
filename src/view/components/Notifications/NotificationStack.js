import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function timer(callback, delay) {
  var id,
    started,
    remaining = delay,
    running;

  this.start = function() {
    running = true;
    started = new Date();
    id = setTimeout(callback, remaining);
  };

  this.pause = function() {
    running = false;
    clearTimeout(id);
    remaining -= new Date() - started;
  };

  this.getTimeLeft = function() {
    if (running) {
      this.pause();
      this.start();
    }

    return remaining;
  };

  this.getStateRunning = function() {
    return running;
  };

  this.start();
}

const calcNotificationBottom = (bottomMargin, index, spacingFn) => {
  const m = index === 0 ? spacingFn(3) : spacingFn(1.5);
  return m + bottomMargin;
};

const NotificationStyled = styled.div`
  z-index: 1000;
  position: fixed;
  left: ${({ theme }) => theme.spacing(3)}px;
  bottom: ${({ theme, bottomMargin, index }) =>
    calcNotificationBottom(bottomMargin, index, theme.spacing)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: ${({ theme }) => theme.borderRadius(1)}px;
  box-shadow: ${({ theme }) => theme.shadows.primary};
  background-color: ${({ theme }) => theme.palette.background.primary};
`;

const NotificationItem = ({
  ID,
  message,
  variant = 'success',
  timeout,
  index,
  hideNotification,
}) => {
  const t = useRef(0);
  const itemRef = useRef(null);
  const [bottomMargin, setBottomMargin] = useState(0);
  //console.log('bottomMargin', bottomMargin, ID);
  const handleClick = () => hideNotification(ID);

  useLayoutEffect(() => {
    if (index > 0) {
      const { top } = itemRef.current.previousSibling.getBoundingClientRect();
      const margin = window.innerHeight - top;

      setBottomMargin(margin);
    }
  }, [index]);

  useEffect(() => {
    if (timeout) {
      hideNotification(ID, timeout);

      //return () => clearTimeout(timer);
    }
  }, []);

  return (
    <NotificationStyled
      bottomMargin={bottomMargin}
      ref={itemRef}
      variant={variant}
      index={index}
      onClick={handleClick}
    >
      {message}
    </NotificationStyled>
  );
};

const NotificationStack = ({ notificationsList, hideNotification }) => {
  console.log('notificationsList', notificationsList);
  return notificationsList.map((notificationItem, index) => {
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
      />
    );
  });
};

NotificationItem.propTypes = {
  ID: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
  timeout: PropTypes.number,
  index: PropTypes.number.isRequired,
  hideNotification: PropTypes.func.isRequired,
};

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
