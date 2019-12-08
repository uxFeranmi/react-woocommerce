import Link from 'next/link';
import './styles/dropdown.scss';

const DropdownMenu = (props) => (
  <div>
    <h3 className="main-nav__toggle">
      Categories 
      <i className="fa fa-chevron-down" aria-hidden="true"></i>
    </h3>

    <ul>
      <li className="dropdown-item">
        Servers
      </li>
      <li className="dropdown-item">
        Accessories 
        <i className="fa fa-chevron-right dropdown-item__expand"></i>
        <ul>
          <li className="dropdown-item">
            Servers
          </li>
          <li className="dropdown-item">
            Accessories 
            <i className="fa fa-chevron-right dropdown-item__expand"></i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default DropdownMenu;