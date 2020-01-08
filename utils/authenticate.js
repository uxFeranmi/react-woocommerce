const authenticate = (email, callback)=> {
  const sse = new EventSource(`/api/auth/sign-in?email=${email}`);

  sse.addEventListener("message", function(e) {
    console.log('Default message event\n', e);
  });

  sse.addEventListener("received", function(e) {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("mailsent", function(e) {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
  });

  sse.addEventListener("authenticated", function(e) {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("timeout", function(e) {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });

  sse.addEventListener("error", function(e) {
    const {type: event, data} = e;
    callback({event, data});
    console.log(`${event}: ${data}`);
    sse.close();
  });
};

export default authenticate;
