import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { FirebaseError } from "firebase/app";
import { BehaviorSubject } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class AuthService {
	private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
	userData$ = this.userDataSubject.asObservable();
	firestore = getFirestore();

	constructor(private afAuth: AngularFireAuth, private messageService: MessageService, private router: Router) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userDataSubject.next(user);
				localStorage.setItem("user", JSON.stringify(user));
			} else {
				this.userDataSubject.next(null);
				localStorage.setItem("user", "null");
			}
		});
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem("user")!);

		return user !== null && user.emailVerified !== false ? true : false;
	}

	login(email: string, password: string) {
		this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				this.setUserData(result.user);
				this.router.navigate(["/global"]);
			})
			.catch((error: FirebaseError) => this.messageService.error(error.message));
	}

	signup(email: string, password: string, displayName: string) {
		this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then(result => {
				this.sendVerificationMail();

				if (result.user) {
					this.setUserData(result.user);
				}
			})
			.catch((error: FirebaseError) => this.messageService.error(error.message));
	}

	private async setUserData(user: any, displayName?: string) {
		try {
			const docRef = doc(getFirestore(), "users", user.uid);
			await setDoc(docRef, { uid: user.uid, email: user.email, displayName: !displayName ? user.displayName : displayName, phoneNumber: user.phoneNumber }, { merge: true });
		} catch (error) {
			this.messageService.error(`Error storing user data`);
		}
	}

	async logout(): Promise<void> {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			this.router.navigate(["/auth/home"]);
		});
	}

	private sendVerificationMail(): Promise<void> {
		return this.afAuth.currentUser
			.then((u: any) => u.sendEmailVerification())
			.then(() => {
				this.router.navigate(["/auth/verify"]);
			});
	}

	async deleteAccount() {
		const user = await this.afAuth.currentUser;

		if (user) {
			const tasksQuery = query(collection(this.firestore, "tasks"), where("uid", "==", user.uid));
			const taskDocs = await getDocs(tasksQuery);

			const deleteTasksPromises = taskDocs.docs.map(async taskDoc => {
				await deleteDoc(taskDoc.ref);
			});

			await Promise.all(deleteTasksPromises);

			const userDocRef = doc(this.firestore, "users", user.uid);
			await deleteDoc(userDocRef);
			await user.delete();

			this.router.navigate(["/auth/home"]);
		}
	}

	googleSignIn() {
		this.afAuth
			.signInWithPopup(new GoogleAuthProvider())
			.then(result => {
				this.setUserData(result.user);
				if (!result.user?.emailVerified) {
					this.sendVerificationMail();
				}
			})
			.catch((error: FirebaseError) => {
				this.messageService.error(`Auth error ${error.message}`);
			});
	}
}
