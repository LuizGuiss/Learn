sap.ui.define([
  "../localService/mockserver"
], function (mockserver) {
  "use strict";

  /**
   * o método init é chamado antes mesmo de carregar o componente.
   * Assim, podemos pegar todas as requisições que iriam para o server 
   * "real" e processá-las localmente pelo server de teste.
   * Próprio componente não sabe que será executado em modo de teste
   */

  //initialize the mock server
  mockserver.init();

  //initiatialize the embedded component on the HTML page
  sap.ui.require(["sap/ui/core/ComponentSupport"]);
});