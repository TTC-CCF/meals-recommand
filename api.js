async function initialize(){
  await liff.init({ liffId:liffID });
  if (!liff.isLoggedIn()){
      await liff.login();
  }
};

async function showProfile(){
    profile = await liff.getProfile();
    $('#user').text('Hello '+profile.displayName);
}

async function getRecommand(){
  const url ="https://5dlypolux2.execute-api.ap-southeast-2.amazonaws.com/apis/get_recommend"
  const mt = $("[name='MealsType']").val();
  const cal = $("[name='Calories']").val();
  $("#user").empty();
  $("#notloading").attr("id","loading");
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "mt": mt,
      "cal": cal,
    }),
    headers:{
      'Content-Type':'application/json',
    }
  })
  .then(data => {
    
    if (data != null){
      let reader = data.body.getReader()
      let decoder = new TextDecoder('utf-8')
      reader.read().then(result =>{
        str = decoder.decode(result.value)
        console.log(str)
        $("#loading").attr("id","notloading");
        $("#user").append(
          $("<article class='message is-dark'><div class='message-header'><p>"+mt+"<br></p></div><div class='message-body'>"+String(str)+"</div></article>")
        );
      })
      
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

// initialize()
//     .then(()=>{
//         showProfile();
//     });