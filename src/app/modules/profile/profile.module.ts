import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { ProfilePage } from "./profile.page";

const routes: Routes = [
	{
		path: "",
		component: ProfilePage
	}
];

@NgModule({
	declarations: [ProfilePage],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule],
	providers: [AngularFireAuth, AuthService]
})
export class ProfileModule {}
