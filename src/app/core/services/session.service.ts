import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/core/dto/user.interface';
import { IProfile } from '../dto/profile.interface';
;
@Injectable({ providedIn: 'root' })
export class SessionService {
  private _currentUserID: string | null = null;
  private _currentProfileID: string | null = null;
  private _accessToken: string | null = null;
  private _isInitialized = new BehaviorSubject<boolean>(false);

  isInitialized$ = this._isInitialized.asObservable();

  // Initialize method - Try to load session data and set initialized flag
  async initialize() {
    try {
      await this.loadSession();
      this._isInitialized.next(true);
    } catch (error) {
      console.error('Session initialization error:', error);
      this._isInitialized.next(true); // Hata olsa da devam et
    }
  }

  // Get Initialization Status Flag
  getIsInitialized(): boolean {
    return this._isInitialized.value;
  }

  // Clear entire session for each data point
  async clearSession() {
    await this.clearCurrentProfileID();
    await this.clearCurrentUserID();
    await this.clearAccessToken();
  }

  // Load entire session for each data point
  async loadSession() {
    await this.loadCurrentProfileID();
    await this.loadCurrentUserID();
    await this.loadAccessToken();
  }

  // GETTER Session Functions
  get currentProfileID(): string | null { return this._currentProfileID; }
  get currentUserID(): string | null { return this._currentUserID; }
  get accessToken(): string | null { return this._accessToken; }

  // SETTER Session Functions
  async setCurrentProfile(profile: IProfile) {
    this._currentProfileID = profile._id;
    await Preferences.set({key: 'currentProfileID', value: this._currentProfileID});
  }
  async setCurrentUser(user: IUser) {
    this._currentUserID = user._id;
    await Preferences.set({key: 'currentUserID', value: this._currentUserID});
  }
  async setAccessToken(token: string) {
    this._accessToken = token;
    await Preferences.set({ key: 'accessToken', value: token });
  }

  // LOADER Session Functions
  async loadCurrentProfileID(){
    if (!this._currentProfileID) {
      const { value } = await Preferences.get({key: 'currentProfileID'});
      this._currentProfileID = value;
    }
    return this._currentProfileID;
  }
  async loadCurrentUserID(){
    if (!this._currentUserID) {
      const { value } = await Preferences.get({key: 'currentUserID'});
      this._currentUserID = value;
    }
    return this._currentUserID;
  }

  async loadAccessToken() {
    if (!this._accessToken) {
      const { value } = await Preferences.get({ key: 'accessToken' });
      this._accessToken = value;
    }
    return this._accessToken;
  }

  // CLEANER Session Functions
  async clearCurrentProfileID() {
    this._currentProfileID = null;
    await Preferences.remove({key: 'currentProfileID'});
  }
  async clearCurrentUserID() {
    this._currentUserID = null;
    await Preferences.remove({key: 'currentUserID'});
  }
  async clearAccessToken() {
    this._accessToken = null;
    await Preferences.remove({ key: 'accessToken' });
  }
}
