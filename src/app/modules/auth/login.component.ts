import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "login",
	template: `<form class="flex flex-col mx-4">
		<mat-form-field class="mt-4"
			><mat-label>Email</mat-label
			><input
				name="email"
				type="email"
				matInput
				required
				[(ngModel)]="email"
		/></mat-form-field>

		<mat-form-field
			><mat-label>Password</mat-label
			><input
				name="password"
				type="password"
				matInput
				required
				[(ngModel)]="password" /></mat-form-field
		><button
			type="submit"
			color="primary"
			mat-raised-button
			(click)="authService.login(email, password)"
			class="mb-4">
			Login
		</button>
		<button
			mat-raised-button
			[routerLink]="'/auth/home'">
			Back
		</button>
	</form>`
})
export class LoginComponent {
	email = "";
	password = "";

	constructor(public authService: AuthService) {}
}
