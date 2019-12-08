import Link from 'next/link';
import './styles/header.scss';

const staticPath = process.env.staticPath || '';

const Header = (props) => (
  <header className="app-header">
    <div className="app-header__thin-strip">
      <small>One Year Warranty On All Products. Shop Now!</small>
      <nav>
        <Link href="#">
          <li>
            <i className="fa fa-user"></i>
            <a>Login/Register</a>
          </li>
        </Link>
        <Link href="#">
          <li>
            <i className="fa fa-question-circle"></i>
            <a>Help</a>
          </li>
        </Link>
        <Link href="#">
          <li>
            <i className="fa fa-shopping-bag"></i>
            <a>Shop</a>
          </li>
        </Link>
      </nav>
    </div>

    <div className="app-header__main nav-bar">
      <div className="nav-bar__title">
        <img src={`${staticPath}/logo.png`} alt="Logo" />
        <h1>IT Supplies.co</h1>
      </div>

      <nav className="nav-bar__nav main-nav">  
        <DropdownMenu
          title="Categories"
          items={props.categories}
          ParentBlock="main-nav" 
        />
      </nav>
    </div>
  </header>
);

export default Header;