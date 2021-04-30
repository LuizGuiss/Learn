sap.ui.define([
  "sap/ui/base/ManagedObject",
  "sap/ui/core/Fragment",
  "sap/ui/core/syncStyleClass"
], function (ManagedObject, Fragment, syncStyleClass) {
  "use strict";

  return ManagedObject.extend("sap.ui.demo.walkthrough.controller.HelloDialog", {
    constructor: function (oView) {
      this._oView = oView;
    },

    exit: function () {
      delete this._oView;
    },

    open: function () {
      var oView = this._oView;

      //create dialog lazily
      /*
       parece que ainda n existe o dialogo no fragmento
       então faz o Fragment.load que carrega o 
       - ID: prefixa o ID dentro do fragmento
       - Nome do fragmento
       - Objeto: no caso, colocamos um controller
     */
      if (!this.pDialog) {
        var oFragmentController = {
          onCloseDialog: function () {
            oView.byId("helloDialog").close();
          }
        };

        //load asynchronous XML fragment
        this.pDialog = Fragment.load({
          id: oView.getId(),
          name: "sap.ui.demo.walkthrough.view.HelloDialog",
          controller: oFragmentController
        }).then(function (oDialog) {
          //connnect dialog to the root view of this component (models, lifecycle)
          oView.addDependent(oDialog);
          // forward compact/cozy style into dialog
          // sincronizamos a classe style do app com o diálogo manualmente
          syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog);
          return oDialog;
        });
      }

      this.pDialog.then(function (oDialog) {
        oDialog.open();
      });
    }
  });
});