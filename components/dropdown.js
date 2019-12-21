import { useState, useEffect } from 'react';
import Link from 'next/link';

import './styles/dropdown.scss';

import ChildDropdown from './child_dropdown';

const DropdownMenu = (props) => {
  let [ isExpanded, setExpanded ] = useState({
    root: false,
  });

  return (
    <div className={`${props.className} dropdown ${isExpanded.root ? 'is-expanded' : ''}`}
    >
      <button className="dropdown__toggle"
        onClick={()=> {
          setExpanded({
            ...isExpanded,
            root: !isExpanded.root,
          });
        }}
      >
        <span>{props.label}</span>
        &nbsp;
        <i className={`
              wide-screen-indicator fa
              ${isExpanded.root ? 'fa-window-close' : 'fa-chevron-down'}
            `}
          aria-hidden="true">
        </i>
        <i className={`
              small-screen-indicator fa 
              ${isExpanded.root ? 'fa-window-close' : 'fa-bars'}
            `}
          aria-label={props.label}>
        </i>
      </button>

      <ul className="dropdown__items"
        tabIndex="-1"
      >
        {props.items.map((item) => {
          if (item[2].length > 0) return (
            <li key={item[1]}>
              <ChildDropdown
                label={item[0]}
                link={item[1]}
                items={item[2]}
                expanded={isExpanded}
                toggleExpanded={(id)=> setExpanded({
                  ...isExpanded,
                  [id]: !isExpanded[id], // The link should be the id.
                })}
              />
            </li>
          );
          else return (
            <li key={item[1]}>
              <Link href={item[1]}>
                <a>{item[0]}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownMenu;
