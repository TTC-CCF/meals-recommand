var liffID = '1660848123-Klzq2xdj';

async function initialize(){
    await liff.init({ liffId:liffID });
    if (!liff.isLoggedIn()){
        await liff.login();
    }
    profile = await liff.getProfile();
    console.log(profile);
};

initialize();