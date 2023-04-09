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

initialize();
showProfile();