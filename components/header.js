import Link from 'next/link';

import HeaderThinStrip from './header_thin_strip';
import DropdownMenu from './dropdown';
import Search from './search';

import './styles/header.scss';

//const staticPath = process.env.staticPath || '';

const Header = (props) => (
  <header className="app-header">
    <HeaderThinStrip className="app-header__thin-strip" />

    <div className="app-header__main nav-bar">
      <Link href='/'>
        <a>
        <h1 className="nav-bar__title">
          <img src="/logo.png" alt="Logo" />
          <span>
            IT Supplies<small>.co</small>
          </span>
        </h1>
        </a>
      </Link>

      <nav className="nav-bar__nav main-nav">
        <div className="main-nav__quick-links">
          <Link href="/sign-in">
            <a>
              <i className="fa fa-user"
                aria-label="Login/Register">
              </i>              
            </a>
          </Link>
          <Link href="/cart">
            <a>
              <i className="fa fa-shopping-cart"
                aria-label="Your shopping cart">
              </i>
              <span className="cart-items-count"></span>
              <span className="cart-total-price"></span>
            </a>
          </Link>
        </div>

        <DropdownMenu
          label="Categories"
          items={props.categories}
          className="main-nav__dropdown" 
        />
      </nav>

      <Search className="nav-bar__search" />

      <div className="nav-bar__quick-links">
        <Link href="#">
          <a><i className="fa fa-check-square-o" aria-label="Compare products"></i></a>
        </Link>
        <Link href="#">
          <a><i className="fa fa-heart-o" aria-label="Your wishlist"></i></a>
        </Link>
        <Link href="/cart">
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