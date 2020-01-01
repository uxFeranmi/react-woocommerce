const Notice = (props)=> {
  //type: 'error', 'warning', 'success'

  return (
    <React.Fragment>
      {props.messages.map((message, index)=> {
        let {type, content, action, dismiss} = message;
        
        return (
          <div className={`notice is-${type}`} key={index}>
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
