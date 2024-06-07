//Import depuis les modules Apex et le framework LWC Salesforce
import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRoleMappings from '@salesforce/apex/SelUsersRolesController.getRoleMappings';
import saveSelectedRole from '@salesforce/apex/SelStructRecordSelectedRole.saveSelectedRole';

// Définition de la classe du composant LWC
export default class selStructSousEtapesTypesEtudeDossier extends LightningElement {
// Déclaration des propriétés suivies (-> suivi des changements)    
    @track roles = [];                      //liste des rôles
    @track selectedRole = '';               //rôles sélectionnés
// Restriction des rôles affichables dans le LWC    
    restrictedRoles = ['REF-REC', 'Jury', 'ADMIN SELECTION', 'GESTIONNAIRE', 'PSY'];


    ////
//Tester la condition est_en_continu__c = true //
// SelRecrutement__c = { est_en_continu__c: true }; // Initialisation de SelRecrutement__c

//     constructor() {
//         super();
//         // Appel de la méthode pour vérifier et mettre à jour les rôles restreints
//         this.checkAndUpdateRestrictedRoles(this.SelRecrutement__c);
//     }
/////
// Méthode de récupération des rôles
        @wire(getRoleMappings)
        wiredOriginesRespValues({ error, data }) {
        if (data) {
// filtrage des rôles(restreints) et affichage mis en forme      
            this.roles = data.filter(role => this.restrictedRoles.includes(role.UserFriendlyRoleName__c)).map(record => {
                return {
                    label: record.UserFriendlyRoleName__c,
                    value: record.TechnicalRoleName__c
                };
            });
        } else if (error) {
// affichage d'un msg d'erreur
            console.error(error);
            this.showToast('Error', error.body.message, 'error');
        }
    }

// Sélection d'un rôle -> appel de la méthode suivante :    
    handleRoleChange(event) {
        this.selectedRole = event.detail.value;                         // Mise à jour du rôle sélectionné
        console.log('Rôle sélectionné:', this.selectedRole);            // Affichage du rôle
        saveSelectedRole({ selectedRoleValue: this.selectedRole });     // Appel de la méthode pour sauvegarder
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
// Méthode pour mettre à jour les rôles restreints
    checkAndUpdateRestrictedRoles(SelRecrutement__c) {
        if (SelRecrutement__c.est_en_continu__c) {
            this.restrictedRoles = ['REF-REC', 'ADMIN SELECTION', 'GESTIONNAIRE', 'PSY'];
        }
    }
}