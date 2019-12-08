import Link from 'next/link';

import './styles/header_thin_strip.scss';

const HeaderThinStrip = props => {
  return (
    <div className={`${props.className} header-thin-strip`}>
      <small>One Year Warranty On All Products. Shop Now!</small>
      <nav>
        <Link href="#">
          <a>
            <i className="fa fa-user"></i>
            Login/Register
          </a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa fa-question-circle"></i>
            Help
          </a>
        </Link>
        <Link href="#">
          <a>
            <i className="fa fa-shopping-cart"></i>
            Shop
          </a>
        </Link>
      </nav>
    </div>
  )
};

export default HeaderThinStrip;