import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "signup",
	template: `Signup`
})
export class SignupComponent {
	constructor(public authService: AuthService) {}
}
