var liffID = '1660848123-Klzq2xdj';
const kk = "RqSyG1BfdcsRCYDRZfSOT3BlbkFJ88OUCEfEEvgImpMBvrSa";
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
  const url ="https://api.openai.com/v1/completions"
  const mt = $("[name='MealsType']").val();
  const cal = $("[name='Calories']").val();
  $("#user").empty();
  $("#notloading").attr("id","loading");
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "model":"text-davinci-003",
      "max_tokens": 1000,
      "prompt": "我想要吃"+String(mt)+"，熱量不能超過"+String(cal)+"，請列出一些菜名，格式: '菜名' '熱量'大卡。",
      "temperature":0.5
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+'sk-'+kk,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var contents = String(data.choices['0'].text);
    contents = contents.replace(/\n/g, '<br>');
    contents = contents.replace(/'/g, '');
    $("#loading").attr("id","notloading");
    $("#user").append(
      $("<article class='message is-dark'><div class='message-header'><p>"+mt+"<br></p></div><div class='message-body'>"+contents+"</div></article>")
    );
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

// initialize()
//     .then(()=>{
//         showProfile();
//     });