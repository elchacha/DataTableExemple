
import LightningDatatable from "lightning/datatable";
import cellColoredTemplate from "./cellColoredTemplate.html";
import cellCheckBoxTemplate from "./cellCheckBoxTemplate.html";
import cellActionIconTemplate from "./cellActionIconTemplate.html";

export default class DynamicDatatable extends LightningDatatable {

    static customTypes = {
        cellColored: {
          template: cellColoredTemplate,
          standardCellLayout: true,
          typeAttributes: ["cellColored"],
        },
        cellCheckBox: {
            template: cellCheckBoxTemplate,
            standardCellLayout: true,
        },cellActionIcon: {
          template: cellActionIconTemplate,
          standardCellLayout: true,
          typeAttributes: ["icon","variant","size","eventname"],
        },

  

        
    }
}