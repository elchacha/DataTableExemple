import { LightningElement,api } from 'lwc';

export default class CellColored extends LightningElement {
    @api value;
    @api custom;


    @api
    get myStyle() {
        if('bgColor'==this.custom){
            return this.getAgeStyle();
        }else if('status'==this.custom){
            return this.getStatusStyle();
        }
        return '';
    }


    getStatusStyle(){
        switch (this.value) {
            case 'New':
                return 'txtGreen';
            case 'Working':
                return 'txtBlue';
            case 'Escalated':
                return 'txtRed';
            default:
                return '';
          }
    }

    getAgeStyle(){
        if(this.value>18){
            return 'bgGreen';
        }else{
            return 'bgRed';
        }
        
    }


}