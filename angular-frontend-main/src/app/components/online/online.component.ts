import { Component, Output, Input, EventEmitter } from '@angular/core';
import { IOnline } from '../../models/online';
import {FormsModule} from '@angular/forms';
import { OnlineService } from '../../services/online.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [FormsModule,ReactiveFormsModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})

export class UserComponent{
    searchBarOnlineString: string='';
    users: IOnline[] = [];
    selectedOnline: IOnline | null = null;
    onlineSelected: boolean = false;
    createMode:boolean=false;
    searchOnlineMode:boolean=false;
    editMode:boolean=false;
    searchedOnline: IOnline | null = null;
    deactivateOnlineId:string='';
    onlineToBeEdited: IOnline | null = null;
    pagesize:number=10;
    currentPage:number=1;

    onlineForm = new FormGroup ({
        name_users: new FormControl([''], Validators.required)
    });

    constructor( public onlineService: OnlineService, private formBuilder: FormBuilder) {  
        
    }
    
    onSelectState(state:IOnline): void{
        this.onlineSelected = true;
        this.selectedOnline = state;
    }

    backToStateList(): void{
        this.onlineSelected = false;
        this.selectedOnline = null;
        this.createMode = false;
        this.searchOnlineMode = false;
        this.searchedOnline = null;
        this.editMode = false;
    }

    createStateBtn(): void{
        this.createMode = true;
    }
    
    searchForState(): void {
        this.searchOnlineMode = true;
        if(this.searchBarOnlineString != ''){
          this.onlineService.getState(this.searchBarOnlineString).subscribe(state => {
            this.searchedOnline = state;
          });
        }else{
          this.searchedOnline = null;
        }
    }

    deactivateState(): void {
        if(this.selectedOnline){
          this.deactivateOnlineId = this.selectedOnline._id || '';
        }else if(this.searchedOnline){
          this.deactivateOnlineId = this.searchedOnline._id || '';
        }
        this.onlineService.deleteState(this.deactivateOnlineId).subscribe(() => { // Removed empty parentheses
          this.backToStateList();
        });
    }

    editState(): void {
        this.editMode = true;

        if(this.selectedOnline){
            this.onlineToBeEdited = this.selectedOnline;
        }else if(this.searchedOnline){
            this.onlineToBeEdited = this.searchedOnline;
        }
        this.onlineForm.patchValues({
            name_users: this.onlineToBeEdited?.name_users || []
        })
    }

    submitState(): void {
        this.onlineForm.value({
            name_users: this.onlineToBeEdited?.name_users || []
        })

        this.onlineService.updateState(this.onlineForm.value).subscribe({
            next: (editedState: IOnline) => {
              console.log('State created:', editedState);
            },
            error: (error: any) => {
              console.error('Error creating user:', error);
              // Handle error cases
            }
        })
    }
}