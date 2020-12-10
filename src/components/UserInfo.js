export class UserInfo {
    constructor({nameSelector, jobSelector, userAvatar}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(userAvatar);
    }

    getUserInfo() {

        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.style.backgroundImage.slice(5,-2)
        };
        return userInfo;   
    }

   setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
        this._avatar.style.backgroundImage = `url(${data.avatar})`;
    }
}