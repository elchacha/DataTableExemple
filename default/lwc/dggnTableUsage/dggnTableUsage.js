import { LightningElement,track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getData';


export default class DggnTableUsage extends LightningElement {
//    static shadowSupportMode = 'native';

    @track result=[];
    @track columns=[];
    connectedCallback() {
        this.getResults();
    }


    rowOffset = 0;
    rowLimit =10;
    sortedBy;
    sortedDirection;
    isLoading = true;
    continueSearching=true;




    getResults() {
        this._getRecords();
    }



    _getRecords(){
        this.isLoading = true;
        return getContactList({limitSize: this.rowLimit , offset : this.rowOffset,orderBy : this.sortedBy,direction : this.sortedDirection}).then(data => {
            console.log('data : '+JSON.stringify(data));
            let updatedRecords = [...this.result, ...data];
            this.result=updatedRecords;
            this.isLoading = false;
            if(data.length == this.rowLimit) {
                this.continueSearching=true;
            } else {
                this.continueSearching=false;

            }
        });
    }

    loadMoreData(event) {
        if(this.continueSearching){
            this.isLoading = true;
            this.rowOffset = this.rowOffset + this.rowLimit;
            this._getRecords()
                .then(()=> {
                    this.isLoading = false;
                });
        }
    }

    callAction(){
        console.log('value>'+this.value);
        console.log('eventName>'+this.eventName);

    }


    onHandleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.rowOffset=0;
        this.result=[];
        this._getRecords();
    }


    handleClick1(){
        this.columns = [
            { label: 'ID', fieldName: 'Id' ,hideDefaultActions: true, sortable: 'true'},
            { label: 'CaseNumber', fieldName: 'CaseNumber' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'iconError', fieldName: 'CaseNumber', type: 'cellActionIcon', typeAttributes: { icon: 'utility:thunder',variant: 'warning',size: 'large',eventname:'action1' ,hideDefaultActions: true, sortable: 'true'}}
        ];
    }

    handleClick2(){
        this.columns = [
            { label: 'CaseNumber', fieldName: 'CaseNumber' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'Checkbox', fieldName: 'Ready__c' ,type: 'cellCheckBox' ,hideDefaultActions: true, sortable: 'true'},
            { label: 'TextColored', fieldName: 'Status', type: 'cellColored', typeAttributes: { cellColored: 'status' ,hideDefaultActions: true, sortable: 'true'}},
            { label: 'iconError', fieldName: 'Id', type: 'cellActionIcon', typeAttributes: { icon: 'utility:error',variant: 'success',size: 'small' ,eventname:'action2',hideDefaultActions: true, sortable: 'true'}}
        ];
    }

    handleClick3(){
        this.columns = [
            { label: 'Id', fieldName: 'Id' ,hideDefaultActions: true, sortable: 'true'},
            { label: 'Origin', fieldName: 'Origin' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'BgColored', fieldName: 'Age__c', type: 'cellColored', typeAttributes: { cellColored: 'bgColor'} ,hideDefaultActions: true, sortable: 'true'},
            { label: 'iconError', fieldName: 'Id', type: 'cellActionIcon', typeAttributes: { icon: 'utility:answer',variant: 'error',size: 'small' ,eventname:'action3',hideDefaultActions: true, sortable: 'true'}}
        ];
    }

}