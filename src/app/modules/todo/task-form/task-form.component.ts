import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Listing } from 'src/app/store/models/listing.model';
import { Task } from 'src/app/store/models/task.model';
import * as fromListingSelectors from 'src/app/store/selectors/listing.selector';
import * as fromTaskActions from 'src/app/store/actions/task.action ';
import * as fromListingActions from 'src/app/store/actions/listing.action';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit,AfterViewInit {

  form: FormGroup;

  @Input() task: Task | undefined;

  @Input() listingId: number | undefined;

  @ViewChild('description') descriptionInput: ElementRef | undefined


  constructor(private fb: FormBuilder, private store: Store,private changeDetector: ChangeDetectorRef) {
    this.form = fb.group({
      id: [''],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
      if (this.task){
        this.form.patchValue({
          ...this.task
        })
      }
  }

  ngAfterViewInit(): void {
      if (!this.descriptionInput){
        return;
      }
     // this.descriptionInput.nativeElement.focus()
     // this.changeDetector.detectChanges()
  }

  get description() {
    return this.form.get('description');
  }

  reset(){
    this.form.patchValue({
      ...this.form.value,
      description: ''
    })
  }

  save() {
    if (this.form.invalid){
      return;
    }
    if (!this.listingId) {
      return;
    }
    if (!this.task?.id) {
      this.store.dispatch(
        fromTaskActions.add({
          task: {
            ...this.form.value,
            listingId: this.listingId,
          },
        })
      );
      this.reset()
      return;
    }
    this.store.dispatch(
      fromTaskActions.update({
        task: {
          ...this.task,
          ...this.form.value,
          listingId: this.listingId
        },
      })
    );
    this.reset()
  }
}
