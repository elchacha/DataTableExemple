import { LightningElement,api } from 'lwc';
import readTemplate from "./readTemplate.html";
import editTemplate from "./editTemplate.html";

import NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class MultiTemplate extends LightningElement {

    fields = [NAME_FIELD];
    nameField=NAME_FIELD;

    // Flexipage provides recordId and objectApiName
    @api recordId='0030900001lmHdWAAU';
    @api objectApiName='Contact';

    @api editMode;

    switchTemplate() {
        this.editMode = !this.editMode;
      }

    render() {
        return this.editMode ? editTemplate : readTemplate;
      }

}