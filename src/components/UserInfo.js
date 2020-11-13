export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
        };
        console.log(userInfo)
        return userInfo;
        
    }

   setUserInfo(profilData) {
        this._name.textContent = profilData.name
        this._job.textContent = profilData.job
    }
}