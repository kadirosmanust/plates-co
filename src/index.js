import '../public/styles.css';
import Campaigns from './components/Campaigns';
import DeliveryFeeInfo from './components/DeliveryFeeInfo';
import Header from './components/Header';
import Notification from './components/Notification';
import ProductList from './components/ProductList';

document.addEventListener('DOMContentLoaded', () => {
  Header();
  Campaigns();
  DeliveryFeeInfo();
  ProductList();
  Notification();
});
