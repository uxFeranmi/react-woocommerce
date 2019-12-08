import Link from 'next/link';
import './styles/dropdown.scss';

const DropdownMenu = (props) => (
  <div className={`${props.parentBlock}__dropdown dropdown`}>
    {console.log(props)}
    {props.child ? (
      <div className="dropdown__toggle is-child">
        <Link href={props.label[1]}>
          <a>{props.label[0]}</a>
        </Link>
        <button>
          <i className="fa fa-chevron-right"
            aria-label="Expand">
          </i>
        </button>
      </div>
     ) : (
      <button className={`${props.parentBlock}__label dropdown__toggle`}>
        Categories
        <i className="fa fa-chevron-down"
          aria-hidden="true">
        </i>
      </button>
    )}

    <ul className={`${props.parentBlock}__items dropdown__items`}>
      {props.items.map((item, index) => {
        const renderedItem = item.length === 3 ? (
          <li key={index}>
            <DropdownMenu
              label={[item[0], item[1]] }
              items={[...item[2]]}
              child={true}
            />
          </li>
        ) : (
          <li key={index}>
            <Link href={item[1]}>
              <a>{item[0]}</a>
            </Link>
          </li>
        );

        return renderedItem;
      })}
    </ul>
  </div>
);

export default DropdownMenu;