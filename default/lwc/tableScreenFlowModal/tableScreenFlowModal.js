import { api } from "lwc";
import LightningModal from 'lightning/modal';
export default class TableScreenFlowModal extends LightningModal {

  @api content;

  get inputVariables() {
    return this.content.inputVariables;
  }

  get screenFlowName(){
    return this.content.screenFlowName;
  }


  // cette methodé renverra à l'appelant les variables "output" du screenflow
  handleStatusChange(event) {
      if (event.detail.status === "FINISHED" || event.detail.status=="FINISHED_SCREEN") {
        let flowVariables={};
        for (const flowVariable of event.detail.outputVariables) {  
          flowVariables[flowVariable.name]=flowVariable.value;
        }
        this.close({flowVariables});
    }
  }
}