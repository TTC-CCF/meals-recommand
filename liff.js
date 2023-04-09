var liffID = '1660848123-Klzq2xdj';

liff.init({
  liffId: liffID
}).then(function() {
  console.log('LIFF init');
  if (!liff.isLoggedIn()){
    liff.login();
  }
  else{
    
  }
    
}).catch(function(error) {
  console.log(error);
});

