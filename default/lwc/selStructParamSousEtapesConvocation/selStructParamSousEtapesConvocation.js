import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRoleMappings from '@salesforce/apex/SelUsersRolesController.getRoleMappings';

//import saveSelectedRole from '@salesforce/apexSelStructRecordselectedRole.saveSelectedRole'


export default class SelStructParamSousEtapesConvocation extends LightningElement {


    @track roles = [];                      //liste des rôles
    @track selectedRole = '';               //rôles sélectionnés
    choiceRdvPossible = false;
    restrictedRoles = ['REF-REC', 'Jury', 'ADMIN SELECTION', 'GESTIONNAIRE' , 'PSY' ];
    
    @wire(getRoleMappings,)


        wiredOriginesRespValues({ error, data }) {
            if (data) {
                this.roles = data.filter(role => this.restrictedRoles.includes(role.UserFriendlyRoleName__c)).map(record => {
            return {
                label: record.UserFriendlyRoleName__c,
                value: record.TechnicalRoleName__c
                    };
                        })   
                        } else if (error) {
                console.error(error);
            this.showToast('Error', error.body.message, 'error');
                                            }
                                                    }

        handleRoleChange(event) {
            this.selectedRole = event.detail.value;
                console.log('Rôle sélectionné:', this.selectedRole);
                                    }


        showToast(title, message, variant) {
            const evt = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
                                            });
            this.dispatchEvent(evt);
}

        changeRdvPossible(event){
                console.log(event,event.detail.checked);
            this.choiceRdvPossible = event.detail.checked;
    
                                }
}