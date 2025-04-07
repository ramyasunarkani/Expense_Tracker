
  function emailVerifyHandler(){
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',{
      method:'POST',
      body:JSON.stringify({"requestType":"VERIFY_EMAIL","idToken":token}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>{
      if(!res.ok){
        return res.json().then((data)=>{
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
      return res.json();
    }).then((data)=>{
          console.log('verification sent', data);

    }).catch((err) => {
            alert(`Error: ${err.message}`);
        });
  }