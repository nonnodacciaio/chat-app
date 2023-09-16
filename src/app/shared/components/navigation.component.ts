import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "navigation",
	template: `<mat-toolbar
		color="primary"
		class="flex justify-between">
		<div>Chat app</div>
		<div *ngIf="authService.isLoggedIn">
			<button
				mat-button
				[routerLink]="'home'">
				Home
			</button>
			<button
				mat-button
				[routerLink]="'user'">
				Profile
			</button>
			<button
				mat-button
				(click)="authService.logout()">
				Logout
			</button>
		</div>
	</mat-toolbar>`
})
export class NavigationComponent {
	constructor(public authService: AuthService) {}
}
