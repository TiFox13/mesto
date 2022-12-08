export default class UserInfo {
    constructor({userName, userAbout, avatarImage}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._avatarImage = document.querySelector(avatarImage)
        
    }

    getUserInfo() {
        const profileInfo = {
            userName : this._userName.textContent,
            userAbout : this._userAbout.textContent,
            myId : this._myId,
        };
        return (profileInfo);
    }

    setUserInfo(obJect) {

        this._userName.textContent = obJect.name;
        this._userAbout.textContent = obJect.about;
        this._avatarImage.src = obJect.avatar;
        this._myId = obJect._id;
    }
}