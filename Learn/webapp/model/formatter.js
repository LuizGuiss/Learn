sap.ui.define([], function () {
  "use strict";
  
  /**
   * statusText: pega o status do modelo de dados
   * como um parâmetro de entrada e retorna um
   * texto legível
   * resourceBundle: este texto é lido deste arquivo
   * */ 

  return {
    statusText: function (sStatus) {
      var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
      switch(sStatus) {
        case "A": 
          return resourceBundle.getText("invoiceStatusA");
        case "B": 
          return resourceBundle.getText("invoiceStatusB");
        case "C": 
          return resourceBundle.getText("invoiceStatusC");
      }
    }
  }
})