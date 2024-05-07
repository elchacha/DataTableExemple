import { LightningElement,api } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CellIIcon extends LightningElement {
    @api icon;
    @api variant;
    @api eventName;
    @api size;
    @api value;

    callAction(){
        console.log('value>'+this.value);
        console.log('eventName>'+this.eventName);
        const event = new ShowToastEvent({
            title: 'Click detected',
            message: 'A event with name '+this.eventName+' and parameter '+this.value+' was sent and should be processed by parent table controller',
            variant: 'success',
            mode: 'dismissable'
        });
        console.log('event to dispatch');
        this.dispatchEvent(event);
        

    }

    
}