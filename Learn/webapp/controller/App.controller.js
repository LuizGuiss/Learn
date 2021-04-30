sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

    /**
     * onInit: é chamado qnd a view do app é instanciado.
     * todos os controles dentro da view do app agr serão ajustados
     * automaticamente p o tamanho compact ou cozy.
     */
    onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

    onOpenDialog: function () {
      this.getOwnerComponent().openHelloDialog();
    }
  });
});