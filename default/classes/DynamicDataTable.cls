public with sharing class DynamicDataTable {


    public class CellActionIcon{
        @AuraEnabled
        public String iconName;
        @AuraEnabled
        public String size;
        @AuraEnabled
        public Object values;
        @AuraEnabled
        public String eventName;
        @AuraEnabled
        public String color;

        // Warning : eventName doit toujours etre en minuscule, pas de majuscule authorisé
        public CellActionIcon(String iconName,String size,Object values,String eventName, String color){
            this.iconName=iconName;
            this.size=size;
            this.values=values;
            this.eventName=eventName;
            this.color=color;
        }

        public CellActionIcon(String color){
            this.color=color;
        }

    }

    public class CellDetail{
        @AuraEnabled
        public String iconName;
        @AuraEnabled
        public Object values;
        @AuraEnabled
        public String color;

        // Warning : eventName doit toujours etre en minuscule, pas de majuscule authorisé
        public CellDetail(String iconName,Object values, String color){
            this.iconName=iconName;
            this.values=values;
            this.color=color;
        }

    }
}