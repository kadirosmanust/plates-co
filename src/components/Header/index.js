import rootElement from '../../utils/rootElement';
import Basket from '../Basket';

import * as styles from './header.module.scss';
const Header = () => {
  const root = rootElement();

  const header = document.createElement('header');
  header.className = styles.header;

  const title = document.createElement('h1');
  title.className = styles.title;
  title.textContent = 'Plates Co';

  header.appendChild(title);
  Basket({ parent: header });
  root.appendChild(header);
};

export default Header;
