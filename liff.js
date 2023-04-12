var liffID = '1660848123-Klzq2xdj';

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
  const mt = $("[name='MealsType']").val();
  const cal = $("[name='Calrolies']").val();
  $.post("http://13.211.56.39:3000/api/recommend", {"food_type":mt, "calories_limit":cal}, function(result){
    console.log(result.message);
  })
}

initialize()
    .then(()=>{
        showProfile();
    });