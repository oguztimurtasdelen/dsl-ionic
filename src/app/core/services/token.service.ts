import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private accessToken: string | null = null;

  set(token: string) {
    this.accessToken = token;
  }

  get(): string | null {
    return this.accessToken;
  }

  clear() {
    this.accessToken = null;
  }
}
