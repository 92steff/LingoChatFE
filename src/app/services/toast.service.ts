import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {
    toasts: any[] = [];

    add(str:string) {
        this.toasts.push(str);
    }

    remove(toast) {
        this.toasts = this.toasts.filter((t) => t != toast);
    }
}