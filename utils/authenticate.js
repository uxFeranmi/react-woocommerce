const authenticate = (email, callback)=> {
  const sse = new EventSource(`/api/auth/sign-in?email=${email}`);

  sse.addEventListener("message", (e)=> {
    console.log('Default message event\n', e);
  });

  sse.addEventListener("received", (e)=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("mailsent", (e)=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("authenticated", (e)=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("timeout", (e)=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("error", (e)=> {
    const {type: event, data} = e;
    let customData = '';
    
    // If connection is closed.
    // 0 — connecting, 1 — open, 2 — closed
    if (sse.readyState === 2) {
      console.log('SSE closed', e);
      customData = "Connection to server was lost and couldn't be re-established.";
    }
    
    // If still connected & it's an unknown error, attempt reconnection.
    else if (!data) return console.log('Reconnecting SSE...');
    
    sse.close();
    console.log('Closed SSE...');
    console.log(`${event}: ${customData || data}`);
    callback({event, data: customData || data});
  });
};

export default authenticate;
