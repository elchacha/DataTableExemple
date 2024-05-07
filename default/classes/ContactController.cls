public with sharing class ContactController {
    @AuraEnabled
    public static list<Sobject> getData(Integer limitSize, Integer offset,String orderBy, String direction)
    {
        String query='SELECT Id,CaseNumber ,Ready__c ,Status , Origin,Age__c  FROM Case';

        // WARNING : orderBy doit correspondre à un champs Salesforce sinon la requete ne pourra pas se faire. NE rendre triable que les colonnes portant sur un champs SF dans la v1
        if(!String.isBlank(orderBy)){
            query+=' ORDER BY '+orderBy+' '+direction.replace('asc','asc NULLS FIRST').replace('desc','desc NULLS LAST');
        }

        if(limitSize!=null){
            query+=' LIMIT '+limitSize;
        }
        if(offset!=null){
            query+=' OFFSET '+offset;
        }

        System.debug('query>'+query);
        return Database.query(query);
    }
}