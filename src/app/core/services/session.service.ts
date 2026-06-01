import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';import { IUser } from 'src/app/core/dto/user.interface';
;
@Injectable({ providedIn: 'root' })
export class SessionService {
  private _currentUser: IUser | null = null;
  private _accessToken: string | null = null;

  // Current User Operations
  get currentUser(): IUser | null {
    return this._currentUser;
  }

  async setCurrentUser(user: IUser | null) {
    this._currentUser = user;
    await Preferences.set({key: 'currentUser', value: JSON.stringify(user)});
  }

  async loadCurrentUser(): Promise<IUser | null> {
    if (!this._currentUser) {
      const { value } = await Preferences.get({key: 'currentUser'});
      this._currentUser = value ? JSON.parse(value) as IUser : null;
    }

    return this._currentUser;
  }

  async clearCurrentUser() {
    this._currentUser = null;
    await Preferences.remove({key: 'currentUser'});
  }


  // Access Token Operations
  get accessToken(): string | null {
    return this._accessToken;
  }


  async setAccessToken(token: string) {
    this._accessToken = token;
    await Preferences.set({ key: 'accessToken', value: token });
  }

  async loadAccessToken() {
    if (!this._accessToken) {
      const { value } = await Preferences.get({ key: 'accessToken' });
      this._accessToken = value;
    }
    return this._accessToken;
  }

  async clearAccessToken() {
    this._accessToken = null;
    await Preferences.remove({ key: 'accessToken' });
  }
}
