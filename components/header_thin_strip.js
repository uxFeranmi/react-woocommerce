import Link from 'next/link';

const HeaderThinStrip = props => {
  return (
    <div className={`${props.className} header-thin-strip`}>
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
  )
};

export default HeaderThinStrip;