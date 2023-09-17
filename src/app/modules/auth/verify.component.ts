import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "verify",
	template: `<div class="flex justify-center items-center h-1/2">
		<mat-card>
			<mat-card-content> Verify your email </mat-card-content>
			<button
				mat-button
				[routerLink]="'/auth/home'">
				Back
			</button>
		</mat-card>
	</div>`
})
export class VerifyComponent {
	constructor(public authService: AuthService) {}
}
