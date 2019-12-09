import React from 'react';
import Link from 'next/link';
import './styles/dropdown.scss';


const DropdownMenu = (props) => {
  const { useState, useEffect } = React;
  
  let dropdown;

  let [ expanded, setExpanded ] = useState(false);

  useEffect(() => {
    if (expanded)
      dropdown.focus();
    
    return;
    //
  }, [expanded]);

  return (
    <div className={`${props.className} dropdown ${expanded ? 'is-expanded' : ''} ${props.child ? 'is-child' : ''}`}
         ref={elem => (dropdown = elem)}
         onBlur={()=> setExpanded(false)}
        >
      {props.child ? (
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
      ) : (
        <button onClick={()=> setExpanded(!expanded)}
            className="dropdown__toggle"
          >
          <span>{props.label}</span>
          &nbsp;
          <i className="fa fa-chevron-down"
            aria-hidden="true">
          </i>
          <i className="fa fa-bars"
            aria-label={props.label}>
          </i>
        </button>
      )}

      <ul className={`${props.parentBlock}__items dropdown__items`}>
        {props.items.map((item) => {
          const renderedItem = item.length === 3 ? (
            <li key={item[1]}>
              <DropdownMenu
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
