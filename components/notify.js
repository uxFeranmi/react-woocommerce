import {useEffect} from 'react';

const Notice = (props)=> {
  //type: 'error', 'warning', 'success'
  let noticeElement;

  useEffect(()=> {
    if (noticeElement)
      noticeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
  })

  return (
    <React.Fragment>
      {props.messages.map((message, index)=> {
        let {type, content, action, dismiss} = message;
        
        return (
          <div className={`notice is-${type}`} key={index}
            ref={(elem)=> noticeElement = elem}>
            <button onClick={dismiss} type="button"
              title="Click to dismiss this notice"
              aria-label="Click to dismiss this notice"
            >
              &times;
            </button>

            <i>
              {content}
            </i>

            {
              action ?
                <button onClick={action.onClick}>
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
