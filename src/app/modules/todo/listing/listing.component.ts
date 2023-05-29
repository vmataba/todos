import { Component, Input, OnInit } from '@angular/core';
import { LISTING_STATUS_ARCHIVED, Listing } from '../../../store/models/listing.model';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/store/models/task.model';
import * as fromTaskSelector from '../../../store/selectors/task.selector';
import { Store } from '@ngrx/store';
import * as fromListingActions from 'src/app/store/actions/listing.action';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  @Input() listing: Listing | undefined;

  tasks$: Observable<Task[]>;

  inViewMode: boolean = false;

  archived: boolean = false;

  constructor(private store: Store) {
    this.tasks$ = of([]);
  }

  ngOnInit(): void {
    if (!this.listing?.id) {
      return;
    }
    this.tasks$ = this.store.select(fromTaskSelector.getTasks(this.listing.id));
    this.archived = this.listing.status == LISTING_STATUS_ARCHIVED
  }

  toggleViewMode() {
    this.inViewMode = !this.inViewMode;
  }

  updateStatus(status: number){
    if (!this.listing){
      return;
    }
    this.store.dispatch(fromListingActions.update({listing: {...this.listing,status}}))
  }

  deleteListing(){
    if (!this.listing?.id){
      return;
    }
    this.store.dispatch(fromListingActions.deleteList({id: this.listing.id}))
  }
}
