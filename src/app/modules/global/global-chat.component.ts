import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "global",
	template: `Global chat
		<button
			mat-raised-button
			color="warn"
			(click)="authService.logout()">
			Logout
		</button>`
})
export class GlobalChatComponent {
	constructor(public authService: AuthService) {}
}
