import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "home",
	template: `<div class="flex flex-col space-y-4">
		<button
			mat-raised-button
			color="primary"
			class="mt-4 mx-4"
			[routerLink]="'/auth/login'">
			Login</button
		><button
			mat-raised-button
			color="primary"
			class="mx-4"
			[routerLink]="'/auth/signup'">
			Signup</button
		><button
			mat-raised-button
			color="warn"
			class="mx-4"
			(click)="authService.googleSignIn()">
			Google signin
		</button>
	</div>`
})
export class HomeComponent {
	constructor(public authService: AuthService) {}
}
