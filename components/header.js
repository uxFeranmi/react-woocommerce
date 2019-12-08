import Link from 'next/link';

import HeaderThinStrip from './header_thin_strip';
import DropdownMenu from './dropdown';
import Search from './search';

import './styles/header.scss';

const staticPath = process.env.staticPath || '';

const Header = (props) => (
  <header className="app-header">
    <HeaderThinStrip className="app-header__thin-strip" />

    <div className="app-header__main nav-bar">
      <h1 className="nav-bar__title">
        <img src={`${staticPath}/logo.png`} alt="Logo" />
        IT Supplies.co
      </h1>

      <nav className="nav-bar__nav main-nav">  
        <DropdownMenu
          label="Categories"
          items={props.categories}
          parentBlock="main-nav" 
        />
      </nav>

      <Search className="app-header__search" />

      <div className="app-header__quick-links">
        <Link href="#">
          <a><i className="fa fa-check-square-o" aria-label="Compare products"></i></a>
        </Link>
        <Link href="#">
          <a><i className="fa fa-heart-o" aria-label="Your wishlist"></i></a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa fa-shopping-cart"
              aria-label="Your shopping cart">
            </i>
            <span className="cart-items-count"></span>
            <span className="cart-total-price"></span>
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;