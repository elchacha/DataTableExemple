import { LightningElement,track,api } from 'lwc';
import getContactList from '@salesforce/apex/SelGestionCandidature.getInfoCandidature';
import { NavigationMixin } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import tableScreenFlowModal from 'c/tableScreenFlowModal';


export default class DggnTableUsage extends NavigationMixin(LightningElement) {
//    static shadowSupportMode = 'native';

    @track result=[];
    @track columns=[];
    // nombre de records à afficher par bloc
    @api rowLimit =10;

    // propriétés qui piloent l'affichage du tabkeau
    rowOffset = 0;
    sortedBy;
    sortedDirection;
    isLoading = true;
    continueSearching=true;
    inputVariables;

    connectedCallback() {
        this.template.addEventListener("action", (evt) => {
            this.callAction(evt);
          });
        this.template.addEventListener("cbselection", (evt) => {
            this.callCbSelection(evt);
        });
        this.template.addEventListener("multiiconevent1", (evt) => {
            this.callMultiIcon(evt);
        });
        this.template.addEventListener("multiiconevent2", (evt) => {
            this.callMultiIcon(evt);
        });
        this.template.addEventListener("detail1", (evt) => {
            this.callDetail1(evt);
        });

        

          
        this._getRecords();
        this.handleClick2();
    }






    _getRecords(){
        this.isLoading = true;
        return getContactList({limitSize: this.rowLimit , offset : this.rowOffset,orderBy : this.sortedBy,direction : this.sortedDirection}).then(data => {
            let updatedRecords = [...this.result, ...data];
            this.result=updatedRecords;
            this.isLoading = false;
            if(data.length == this.rowLimit) {
                this.continueSearching=true;
            } else {
                this.continueSearching=false;

            }

            console.log(JSON.stringify(this.result));

        });
    }


    /*
        methodes qui pilotent les événements qui peuvent etre déclenché par les custom cell.
        Bien penser à :
        - ajouter un listener pour chaque événement dans le connectedCallBack 
            ex :
            this.template.addEventListener("action", (evt) => {
            this.callAction(evt);
          });
        - ajouter la méthode déclarer précédemment et ajouter dedans les actions à faire
          ex : callAction(event)
        
    */


    value;          
    // async : obligatoire pour pouvoir gérer le retour de la modal 
    // content doit indiquer : le nom du screenFlow à lancer et dans inputVariables, il faut déclarer les variables attendus par le flow (1 objet js par paramètre du flow)
    async  callAction(event){
        const result = await tableScreenFlowModal.open({
            size: 'small',
            description: 'Accessible description of modal\'s purpose',
            content: {screenFlowName : 'screenFlowTest' , inputVariables : [{name: 'iVariable1',type: 'String',value: event.detail}]}
        });
        console.log('modal info : '+JSON.stringify(result.flowVariables));
        // attention , js est case sensitive !!! oVariable1 ne marcherait pas 
        this.displayActionCliked(result.flowVariables.ovariable1);
    }




    callCbSelection(event){
        this.displayActionCliked('cbselection');
    }

    callMultiIcon(event){
        this.displayActionCliked('multiiconevent1');
    }
    callDetail1(event){
        this.displayActionCliked('detail1');
    }


    displayActionCliked(action){
        console.log('action : '+action);

        const evt = new ShowToastEvent({
            title: 'action reçu',
            message: 'action '+action+' a été cliqué',
            variant: 'success',
          });
        this.dispatchEvent(evt);

    }


    handleStatusChange(event) {
        if (event.detail.status === "FINISHED_SCREEN") {    
            console.log('detail : '+JSON.stringify(event.detail));
        }
    }

    
    /*
        methodes en charge de gérer les tris et de gérer le "défilement infini"
    */

    onHandleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.rowOffset=0;
        this.result=[];
        this._getRecords();
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



    /*
        LES METHODES CI-DESSOUS ne sont là que temporairement */


    handleClick1(){
        this.columns = [
            { label: 'Id', fieldName: 'Id' ,hideDefaultActions: true, sortable: 'true'},
            { label: 'Owner', fieldName: 'contactName' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'detail', fieldName: 'Id', type: 'cellDetail', typeAttributes: { eventname:'detail1',info :{ fieldName: "detail" }},hideDefaultActions: true, sortable: 'false'}
        ];
    }

    handleClick2(){
        this.columns = [
            { label: 'Id', fieldName: 'Id' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'Checkbox', fieldName: 'Salutation' ,type: 'cellCheckBox' ,typeAttributes: { eventname:'cbselection',selected: {fieldName: "Salutation" },recordid: {fieldName: "Id" }} ,hideDefaultActions: true, sortable: 'true'},
            { label: 'TextColored', fieldName: 'Salutation', type: 'cellColored', typeAttributes: { cellColored: 'status' },hideDefaultActions: true, sortable: 'true'},
            { label: 'multiIcon', fieldName: 'Salutation', type: 'cellActionIcon', typeAttributes: { icon: 'utility:error',variant: 'success',size: 'small' ,eventname:'action',info :{ fieldName: "multiIcon" }},hideDefaultActions: true, sortable: 'false'},
            { label: 'detail', fieldName: 'Id', type: 'cellDetail', typeAttributes: { eventname:'detail1',info :{ fieldName: "detail" }},hideDefaultActions: true, sortable: 'false'},
            { label: 'button', fieldName: 'Id', type: 'cellActionButton', typeAttributes: { label: 'monBouton',variant: 'warning',css: '',eventname:'action' },hideDefaultActions: true, sortable: 'false'},

        ];
    }

    handleClick3(){
        this.columns = [
            { label: 'Id', fieldName: 'Id' ,hideDefaultActions: true, sortable: 'true'},
           { label: 'Origin', fieldName: 'Salutation' ,hideDefaultActions: true, sortable: 'true' },
            { label: 'BgColored', fieldName: 'Id', type: 'cellColored', typeAttributes: { cellColored: 'bgColor'} ,hideDefaultActions: true, sortable: 'true'},
            { label: 'monoIcon', fieldName: 'Id', type: 'cellActionIcon', typeAttributes: { icon: 'utility:edit',size: 'small' ,eventname:'action',info :{ fieldName: "monoIcon" }},hideDefaultActions: true, sortable: 'false'},
           { label: 'multiIcon', fieldName: 'Id', type: 'cellActionIcon', typeAttributes: {eventname:'action',info :{ fieldName: "multiIcon" }},hideDefaultActions: true, sortable: 'false'}
        ];
    }



}