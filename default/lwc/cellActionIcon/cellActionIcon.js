import { LightningElement,api } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CellIIcon extends LightningElement {

    @api color;
    @api eventName;
    @api size;
    @api value;
    @api info;
    @api icon;

    connectedCallback(){
        if(this.info){
            if(!Array.isArray(this.info)){
                if(this.info.color) this.color=this.info.color;
                if(this.info.eventName) this.eventName=this.info.eventName;
                if(this.info.size) this.size=this.info.size;
                if(this.info.iconName) this.icon=this.info.iconName;
                if(this.info.values) this.info=this.info.values;
            }
        }
    }

   get iconDisplay(){
        if(this.info){
            return this.info.iconName;
        }else{
            return this.icon;
        }
    }



    get multiIcon(){
        return this.info&&Array.isArray(this.info);
    }

    callAction(){
        console.log('button detail : '+JSON.stringify(this.info));
        this.dispatchEvent(new CustomEvent(this.eventName, { bubbles: true , composed : true, detail: this.info }));
    }

    get css(){
        return '--sds-c-icon-color-foreground-default: '+this.color;
    }

}