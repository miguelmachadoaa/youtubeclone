import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/youtube';

  tutorialsRef: AngularFirestoreCollection<any>;

  constructor(private readonly db: AngularFirestore) {
    this.tutorialsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.tutorialsRef;
  }

  create(tutorial: any): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
