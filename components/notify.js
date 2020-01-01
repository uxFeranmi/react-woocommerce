import {useEffect} from 'react';

import './styles/notify.scss';

const Notice = (props)=> {
  //type: 'error', 'warning', 'success', 'info'
  let noticeElement;

  useEffect(()=> {
    if (noticeElement) {
      noticeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  })

  return (
    <React.Fragment>
      {props.messages.map((message, index)=> {
        let {type, content, action, dismiss} = message;
        
        return (
          <div className={`notice is-${type}`} key={index}
            ref={(elem)=> noticeElement = elem}>
            <button onClick={dismiss} type="button"
              className="notice__dismiss"
              title="Click to dismiss this notice"
              aria-label="Click to dismiss this notice"
            >
              &times;
            </button>

            <i
              className="notice__content"
            >
              {content}
            </i>

            {
              action ?
                <button onClick={action.onClick}
                  className="notice__action"
                >
                  {action.label}
                </button>
              : ''
            }
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Notice;
