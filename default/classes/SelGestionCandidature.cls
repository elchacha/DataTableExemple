public with sharing class SelGestionCandidature {

    public static Map<String,String> sortableFields;
    static{
        sortableFields = new Map<String,String>();
        sortableFields.put('contactName','PersonContact.LastName');


    }

    @AuraEnabled
    public static list<Map<String,Object>> getInfoCandidature(Integer limitSize, Integer offset,String orderBy, String direction)
    {
        String query='SELECT Id, PersonContact.Name ,Sexe__c ,PersonBirthdate ,Salutation  FROM Account ';

        // WARNING : orderBy doit correspondre à un champs Salesforce sinon la requete ne pourra pas se faire. NE rendre triable que les colonnes portant sur un champs SF dans la v1
        if(!String.isBlank(orderBy)){
            // on doit traduire les champs calculé pour permettre un tri dessus
            if(sortableFields.containsKey(orderBy))
                orderBy=sortableFields.get(orderBy);
            query+=' ORDER BY '+orderBy+' '+direction.replace('asc','asc NULLS FIRST').replace('desc','desc NULLS LAST');
        }

        if(limitSize!=null){
            query+=' LIMIT '+limitSize;
        }
        if(offset!=null){
            query+=' OFFSET '+offset;
        }
        list<Map<String,Object>> result = new list<Map<String,Object>>();
        for(Account acct : Database.query(query)){
            Map<String, Object> record = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(acct));
            record.put('multiIcon',displayMultiIcon(acct));
            record.put('monoIcon',chooseColorForStatus(acct));
            record.put('detail',displayDetail(acct));
            record.put('contactName',acct.PersonContact.Name);
            result.add(record);
        }
        return result;
    }



    /*
        exemple poour afficher le contenu d'une celle de type icone simple
    */
    private static DynamicDataTable.CellActionIcon chooseColorForStatus(Account acct){
        String color='blue';
        switch on acct.Salutation {
            when  'Ms.' {
                color='green';
            }
            when  'Mr.' {
                color='red';
            }
        }
        return new DynamicDataTable.CellActionIcon(color);
    }

    /*
        exemple poour afficher le contenu d'une celle de type multi icone simple
    */
    private static List<DynamicDataTable.CellActionIcon> displayMultiIcon(Account acct){
        List<DynamicDataTable.CellActionIcon> results = new List<DynamicDataTable.CellActionIcon>();
        String color='blue';
        switch on acct.Salutation {
            when  'Ms.' {
                color='green';
            }
            when  'Mr.' {
                color='red';
            }
        }
        results.add(new DynamicDataTable.CellActionIcon('utility:edit','small',acct.Id,'multiiconevent1',color));
        results.add(new DynamicDataTable.CellActionIcon('utility:error','small',acct,'multiiconevent2',color));
        results.add(new DynamicDataTable.CellActionIcon('utility:answer','small',acct,'multiiconevent3',color));

        return results;
    }


    /*
        exemple poour afficher le contenu d'une celle de type detail
    */
    private static DynamicDataTable.CellDetail displayDetail(Account acct){
        String color='red';
        String iconName='utility:close';
        switch on acct.Salutation {
            when  'Ms.' {
                color='green';
                iconName='utility:success';
            }
            when  'Mr.' {
                color='blue';
                iconName='utility:info';
            }
        }
        return new DynamicDataTable.CellDetail(iconName,acct,color);
    }


}