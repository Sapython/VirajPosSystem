import { Injectable } from '@angular/core';
import { setDoc, doc, Firestore, increment, updateDoc, addDoc, collection, getDocs, collectionSnapshots, collectionData } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private fs:Firestore) { }

  getTasks(){
    return collectionData(collection(this.fs,'tasks'),{idField:'id'})
  }

  updateTime(counter:number){
    return setDoc(doc(this.fs,'time','time'),{time:new Date(),counter:increment(counter)}, {merge:true})
  }

  addTask(task:string){
    return addDoc(collection(this.fs,'tasks'),{task:task,done:false})
  }

  updateTask(task:string){
    return updateDoc(doc(this.fs,'tasks',task),{task:task})
  }

  deleteTask(taskId:string){
    return deleteDoc(doc(this.fs,'tasks',taskId))
  }

}
