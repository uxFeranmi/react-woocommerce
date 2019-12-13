import React from 'react';
import Link from 'next/link';
import './styles/dropdown.scss';

const ChildDropdown = (props) => {
  return (
    <div className={`${props.className} child-dropdown ${expanded ? 'is-expanded' : ''}`}
         ref={elem => (dropdown = elem)}
         onBlur={()=> setExpanded(false)}
        >
      <div className="dropdown__toggle is-child">
        <Link href={props.key}>
          <a>{props.label}</a>
        </Link>

        <button onClick={()=> setExpanded(!expanded)}>
          <i className="fa fa-chevron-right"
            aria-label="Expand">
          </i>
        </button>
      </div>

      <ul className={'dropdown__items'}>
        {props.items.map((item) => {
          const renderedItem = item.length === 3 ? (
            <li key={item[1]}>
              <ChildDropdown
                label={item[0]}
                key={item[1]}
                items={[...item[2]]}
                child={true}
              />
            </li>
          ) : (
            <li key={item[1]}>
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
};

export default DropdownMenu;
