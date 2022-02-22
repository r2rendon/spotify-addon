import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore/lite";

export type FirebaseType = {
    app: FirebaseApp;
    db: Firestore;
}