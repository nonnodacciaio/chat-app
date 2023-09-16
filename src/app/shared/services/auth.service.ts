import { Injectable } from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class AuthService {
	private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
	userData$ = this.userDataSubject.asObservable();

	constructor(private afAuth: AngularFireAuth, private messageService: MessageService) {
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
				// TODO: redirect user after login
			})
			.catch((error: FirebaseError) => this.messageService.error(error.message));
	}

	signup(email: string, password: string) {
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

	private async setUserData(user: any) {
		try {
			const docRef = doc(getFirestore(), "users", user.uid);
			await setDoc(docRef, { uid: user.uid, email: user.email, displayName: user.displayName, phoneNumber: user.phoneNumber }, { merge: true });
		} catch (error) {
			this.messageService.error(`Error storing user data`);
		}
	}

	async logout(): Promise<void> {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			// TODO: redirect user after logout
		});
	}

	private sendVerificationMail(): Promise<void> {
		return this.afAuth.currentUser
			.then((u: any) => u.sendEmailVerification())
			.then(() => {
				// TODO: redirect user to verify address page
			});
	}

	async deleteAccount() {
		const user = await this.afAuth.currentUser;

		if (user) {
			const firestore = getFirestore();
			const tasksQuery = query(collection(firestore, "tasks"), where("uid", "==", user.uid));
			const taskDocs = await getDocs(tasksQuery);

			const deleteTasksPromises = taskDocs.docs.map(async taskDoc => {
				await deleteDoc(taskDoc.ref);
			});

			await Promise.all(deleteTasksPromises);

			const userDocRef = doc(firestore, "users", user.uid);
			await deleteDoc(userDocRef);
			await user.delete();

			// TODO: redirect user after deletion
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
