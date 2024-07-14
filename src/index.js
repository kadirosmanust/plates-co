import '../public/styles.css';
import Campaigns from './components/Campaigns';
import DeliveryFeeInfo from './components/DeliveryFeeInfo';
import Header from './components/Header';
import ProductList from './components/ProductList';

document.addEventListener('DOMContentLoaded', () => {
  Header();
  Campaigns();
  DeliveryFeeInfo();
  ProductList();
});
