var liffID = '1660848123-Klzq2xdj';
const kk = "f9WWADzmDP4dWuio04JgT3BlbkFJoboaFkc7tmolz9vxfrHo";

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
  const url ="https://api.openai.com/v1/chat/completions"
  const mt = $("[name='MealsType']").val();
  const cal = $("[name='Calories']").val();
  console.log("我想要吃"+String(mt)+"，熱量不能超過"+String(cal)+"，你有什麼推薦的餐點嗎? 格式: '菜名' '熱量'卡");
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "model":"gpt-3.5-turbo",
      "messages": [{
        "role":"user", 
        "content": "我想要吃"+String(mt)+"，熱量不能超過"+String(cal)+"，你有什麼推薦的餐點嗎? 格式: '菜名' '熱量'卡",
      }],
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
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

// initialize()
//     .then(()=>{
//         showProfile();
//     });