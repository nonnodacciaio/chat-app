import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "verify",
	template: `Verify`
})
export class VerifyComponent {
	constructor(public authService: AuthService) {}
}
