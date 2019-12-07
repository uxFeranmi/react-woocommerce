import Link from 'next/link';
import './styles/header.scss';

const Header = () => (
  <header className="app-header">
    <div className="app-header__thin-strip">
      <small>One Year Warranty On All Products. Shop Now!</small>
      <nav>
        <Link href="#">
          <li>
            <i className="fas fa-user"></i>
            <a>Login/Register</a>
          </li>
        </Link>
        <Link href="#">
          <li>
            <i className="fas fa-question-circle"></i>
            <a>Help</a>
          </li>
        </Link>
        <Link href="#">
          <li>
            <i className="fas fa-shopping-bag"></i>
            <a>Shop</a>
          </li>
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;