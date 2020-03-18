import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { isObject, isArray, isString } from 'util';
import { User } from '../models/user';
import { resolve } from 'url';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private apiService: ApiService) { }
	private user: User
	getUser(): Promise<any> {
		const xx = new Promise((resolve, reject) => {
			this.apiService.get('posts/1')
				.then((response) => {
					response = JSON.parse(response);
					let aaa = new User(response)
					resolve(aaa)
				}).catch((error: HttpErrorResponse ) => {
					if(error.status == 404){
						reject(error.ok)
					}
				})
		})
		return xx;
	}
}
