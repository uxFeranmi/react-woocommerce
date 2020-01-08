const authenticate = (email, callback)=> {
  const sse = new EventSource(`/api/auth/sign-in?email=${email}`);

  sse.addEventListener("message", function(e) {
    console.log('Default message event\n', e);
  });

  sse.addEventListener("received", function(e) {
    callback('received');
    console.log(`${e.type}: ${e.data}`);
  });

  sse.addEventListener("mailsent", function(e) {
    callback('mailsent: Check your email for your one-time secure sign-in link.');
    console.log(`${e.type}: ${e.data}`);
  });

  sse.addEventListener("authenticated", function(e) {
    callback('authenticated');
    console.log(`${e.type}: ${e.data}`);
    sse.close();
  });

  sse.addEventListener("timeout", function(e) {
    callback('timeout');
    console.log(`${e.type}: ${e.data}`);
    sse.close();
  });

  sse.addEventListener("error", function(e) {
    callback('error');
    console.log(`${e.type}: ${e.data}`);
    sse.close();
  });
};

export default authenticate;
