import { DELIVERY_FEE_TEXT } from '../../constants';
import rootElement from '../../utils/rootElement';

import * as styles from './deliveryFeeInfo.module.scss';

const DeliveryFeeInfo = () => {
  const root = rootElement();
  const infoContainer = document.createElement('div');
  const infoText = document.createElement('p');
  infoText.textContent = DELIVERY_FEE_TEXT;
  infoText.className = styles.infoText;
  infoContainer.className = styles.infoContainer;

  infoContainer.appendChild(infoText);
  root.appendChild(infoContainer);
};

export default DeliveryFeeInfo;
