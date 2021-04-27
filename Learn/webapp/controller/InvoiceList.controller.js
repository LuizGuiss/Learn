// ser capaz de acessar o código da moeda que não é 
// parte do nosso modelo de dados

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../model/formatter",
  "sap/ui/model/Filter",            //contem nossa config p ação de filtro
  "sap/ui/model/FilterOperator"     //auxiliar p especificar o filtro
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
    formatter: formatter,
    onInit: function () {
      var oViewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView().setModel(oViewModel, "view")
    },


    /**
     * onFilterInvoices: constroi um obj de filtro de pesquisa que o user
     * digita no campo de pesquisa
     * getParameter: acessa a consulta que foi feito no campo de pesquisa
     * 
     * foi criado um array vazio (aFilter). Ele está vazio pq caso o user
     * digite algo, ele vai p esse array e a pesquisa pode ser feita. Caso
     * contrário, vai aparecer tudo, pq nada foi pesquisado em específico.
     */

    onFilterInvoices: function (oEvent) {
      //build filter array
      var aFilter = [];
      var sQuery = oEvent.getParameter("query");
      if (sQuery) {
        aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
      }


      /**
       * solicita à view o controle com o byID;
       * acessa o binding dos itens para poder filtrar;
       * vai filtrar para poder exibir somente os itens correspondentes;
       * (não faz destinção entre maiúsculo ou minúsculo)
       */
      // filter binding
      var oList = this.byId("invoiceList");
      var oBinding = oList.getBinding("items");
      oBinding.filter(aFilter);
    }
  });
});