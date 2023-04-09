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
    const mt = $("input[name='MealsType']").value;
    const cal = $("input[name='Carolies']").value;
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "我想吃"+mt+"，熱量不能超過"+String(cal)+"，請給我一些推薦的菜色。格式:菜名 熱量(卡)。",
      temperature: 0.5,
      max_tokens: 100,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    console.log(response);
}

initialize()
    .then(()=>{
        showProfile();
    });