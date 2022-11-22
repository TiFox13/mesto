export default class UserInfo {
    constructor({userName, userAbout}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }

    getUserInfo() {
        const profileInfo = {
            userName : this._userName.textContent,
            userAbout : this._userAbout.textContent,
        };
        return (profileInfo);
    }

    setUserInfo(obJect) {
        this._userName.textContent = obJect.name;
        this._userAbout.textContent = obJect.about;
    }
}