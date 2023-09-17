import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";
import { GlobalChatComponent } from "./global-chat.component";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
	{
		path: "",
		component: GlobalChatComponent
	}
];

@NgModule({
	declarations: [GlobalChatComponent],
	imports: [CommonModule, RouterModule.forChild(routes), AngularFireModule.initializeApp(environment.firebase), MatButtonModule],
	providers: [AngularFireAuth, AuthService]
})
export class GlobalChatModule {}
