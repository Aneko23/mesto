import {profileName, profileJob, nameInput, jobInput} from './utils.js';

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
        return userInfo;
    }

    setUserInfo() {
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
    }
}