/**
 * contém as funções auxiliares que chamamos em nossa journey
 */

sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/actions/Press"
], function (Opa5, Press) {
  "use strict";

  var sViewName = "sap.ui.demo.walkthrough.view.HelloPanel";

  /**
   * createPageObjects: definimos um objeto de página.
   * onTheAppPage: passamos um obj com a chave da nossa pag + actions e assertions.
   * Actions: definimos uma função p clicar no botão de dialogo. O waitFor é como um
   * loop que verifica os parâmetros.
   * Assertions: verifica se um controle existe na DOM. devolve uma instrução após
   * o teste for bem sucedido.
   */

  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {
        iPressTheSayHelloWithDialogButton: function () {
          return this.waitFor({
            id: "helloDialogButton",
            viewName: sViewName,
            actions: new Press(),
            errorMessage: "Did not find the 'Say Hello With Dialog' button on the HelloPanel view"
          });
        }
      },

      assertions: {
        iShouldSeeTheHelloDialog: function () {
          return this.waitFor({
            controlType: "sap.m.Dialog",
            success: function () {
              // we set the view busy, so we need to query the parent of the app
              Opa5.assert.ok(true, "The dialog is open");
            },
            errorMessage: "Did not find the dialog control"
          });
        }
      }
    }
  });
});