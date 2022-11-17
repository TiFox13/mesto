export default class UserInfo {
    constructor({userName, userAbout}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
    }

    getUserInfo() {
        console.log('гетинфо отработала!', this._userName, this._userAbout)

        const profileInfo = {
            userName : this._userName.textContent,
            userAbout : this._userAbout.textContent,
        };
        return (profileInfo);

    }

    setUserInfo(obg) {
        console.log('подгрузка стработала!')
        this._userName.textContent = obg.name.value;
        this._userAbout.textContent = obg.about.value;
    }

    setUserInfoValues(obg) {
        const profileInfo = this.getUserInfo(this._userName, this._userAbout);
       
        obg.name.value = profileInfo.userName;
        obg.about.value = profileInfo.userAbout;
    }
}