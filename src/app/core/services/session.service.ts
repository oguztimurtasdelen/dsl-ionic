import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';;
@Injectable({ providedIn: 'root' })
export class SessionService {
  private _userId: string | null = null;
  private _token: string | null = null;

  async setUserId(id: string) {
    this._userId = id;
    await Preferences.set({ key: 'userId', value: id });
  }

  async loadUserId() {
    if (!this._userId) {
      const { value } = await Preferences.get({ key: 'userId' });
      this._userId = value;
    }
    return this._userId;
  }

  get userId(): string | null {
    return this._userId;
  }

  async clearUserId() {
    this._userId = null;
    await Preferences.remove({ key: 'userId' });
  }

  decodeJWTPayload<T = any>(token: string): T | null {
    try {
      // JWT üç parçadan oluşur: header.payload.signature
      const payloadBase64 = token.split('.')[1];

      if (!payloadBase64) return null;

      // Base64 URL-safe decode → atob sadece standart base64 kabul eder
      const payloadBase64Padded = payloadBase64
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        + '='.repeat((4 - (payloadBase64.length % 4)) % 4);

      const payloadJson = atob(payloadBase64Padded);
      return JSON.parse(payloadJson) as T;
    } catch (e) {
      console.error('Invalid JWT', e);
      return null;
    }
  }

  async setToken(token: string) {
    this._token = token;
    await Preferences.set({ key: 'token', value: token });
  }

  async loadToken() {
    if (!this._token) {
      const { value } = await Preferences.get({ key: 'token' });
      this._token = value;
    }
    return this._token;
  }

  get token(): string | null {
    return this._token;
  }

  async clearToken() {
    this._token = null;
    await Preferences.remove({ key: 'token' });
  }
}
