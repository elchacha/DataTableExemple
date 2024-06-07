import { LightningElement ,api} from 'lwc';

export default class CellActionButton extends LightningElement {

    @api variant;
    @api eventName;
    @api css;
    @api value;
    @api label;

    connectedCallback(){
        if(!this.variant) this.variant='brand';
        if(!this.css) this.css='brand';
    }

    callAction(){
        // retourne la valeur du champs fourni durant l'appel par défaut.
        this.dispatchEvent(new CustomEvent(this.eventName, { bubbles: true , composed : true, detail: this.value }));
    }


}