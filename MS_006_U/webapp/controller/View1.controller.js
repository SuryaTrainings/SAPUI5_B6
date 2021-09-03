sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function(Controller, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("home.controller.View1",{
        onInit: function(){

        },
        onPress: function(){
            debugger;
            var oAppCon = this.getView().getParent();

            oAppCon.to("idAppView2");
        },
        onSearch: function(oEvent){
            debugger;

            // waht is the user type in search field
            var oSearch = oEvent.getParameter("query");

            if(oSearch === "" || oSearch === undefined){
                oSearch = oEvent.getParameter("newValue"); 
            }

            // consturct the filter object with operator & operand
            var oFilter1 = new Filter("Car", FilterOperator.Contains, oSearch);
            var oFilter2 = new Filter("model", FilterOperator.Contains, oSearch);
            var aFilter = [oFilter1, oFilter2];
            var oMaster = new Filter({
                filters: aFilter,
                and: false
            }); 
            // get the list object
            var oList = this.getView().byId("idList");  
            // inject the filter to the list
            oList.getBinding("items").filter(oMaster);

        },

        onRowClick: function(){
            this.onPress();
        },

        onDelete: function(oEvent){
            //Stpe - 1 : find which item was selected
            var oSelected = oEvent.getParameter("listItem");
            //Step - 2 : Get List object  
            var oList = oEvent.getSource();
            //Step - 3 : Remove item
            oList.removeItem(oSelected);   
        }
    });
    
});