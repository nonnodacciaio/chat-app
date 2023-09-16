import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "login",
	template: `Login`
})
export class LoginComponent {
	constructor(public authService: AuthService) {}
}
