import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "global",
	template: `Global chat`
})
export class GlobalChatComponent {
	constructor(public authService: AuthService) {}
}
