import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "auth/home", pathMatch: "full" },
	{ path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthenticationModule) },
	{ path: "global", loadChildren: () => import("./modules/global/global-chat.module").then(m => m.GlobalChatModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
