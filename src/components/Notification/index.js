import { subscribe } from '../../pubsub';
import rootElement from '../../utils/rootElement';

import * as styles from './notification.module.scss';
const Notification = () => {
  const root = rootElement();

  const notificationContainer = document.createElement('div');
  notificationContainer.className = styles.notificationContainer;

  const addNotification = message => {
    const notification = document.createElement('div');
    notification.className = `${styles.notification}`;
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  subscribe('NOTIFICATION', addNotification);

  root.appendChild(notificationContainer);
};

export default Notification;
