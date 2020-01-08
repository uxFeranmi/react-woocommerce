/*const authenticate = (email, callback)=> {
  const sse = new EventSource(`/api/auth/sign-in?email=${email}`);

  sse.addEventListener("message", ()=> {
    console.log('Default message event\n', e);
  });

  sse.addEventListener("received", ()=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("mailsent", ()=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("authenticated", ()=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("timeout", ()=> {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("error", ()=> {
    const {type: event, data} = e;
    data = JSON.parse(data);

    // If it's a known error, close sse and inform user. Else attempt reconnection.
    if (data.reason) {
      sse.close();

      callback({event, data});
      console.log(`${event}: ${data}`);
    }
  });
};*/

const authenticate = (email, callback)=> {
  setTimeout(()=> {
    const {type: event, data} = {type: "received"};
    callback({event, data});
    console.log(`${event}: ${data}`);
  }, 3000);

  setTimeout(()=> {
    const {type: event, data} = {type: "mailsent"};
    callback({event, data});
    console.log(`${event}: ${data}`);
  }, 6000);

  setTimeout(()=> {
    const {type: event, data} = {type: "authenticated"};
    callback({event, data});
    console.log(`${event}: ${data}`);
  }, 9000);

  setTimeout(()=> {
    const {type: event, data} = {type: "timeout"};
    callback({event, data});
    console.log(`${event}: ${data}`);
  }, 12000);

  setTimeout(()=> {
    const {type: event, data} = {type: 'error'};
    callback({event, data});
    console.log(`${event}: ${data}`);
  }, 15000);
};

export default authenticate;
