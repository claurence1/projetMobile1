import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Updates } from '../models/updates';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) {   }

  public getAllUpdates() {
    return this.http.get(this.server + 'updates');
  }

  public getAllInProgress() {
    return this.http.get(this.server + 'updates/getAllInProgress');
  }

  public getAllEnd() {
    return this.http.get(this.server + 'updates/getAllEnd')
  }

  public updateToRejectUpdate(updatetoReject: Updates) {
    return this.http.post(this.server + 'updates/updateToReject/' + updatetoReject.id,updatetoReject);
  }
  public updateToConfirmUpdate(updateToConfirm: Updates) {
    return this.http.post(this.server + 'updates/updateToConfirm/' + updateToConfirm.id, updateToConfirm);
  }

  public insertUpdate(update: Updates) {
    return this.http.post(this.server + 'updates/', update);
  }
}
