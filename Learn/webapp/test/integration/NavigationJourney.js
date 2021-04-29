/*global QUnit, opaTest*/

/**
 * um journey consiste em uma série de testes de integração
 * que pertencecm ao msm contexto (ex: navegar no app).
 */

sap.ui.define([
  "sap/ui/demo/walkthrough/localService/mockserver",
  "sap/ui/test/opaQunit",
  "./pages/App"
], function (mockserver) {
  "use strict";

  QUnit.module("Navigation");

   /**
    * a função opaTest é o aspecto principal p defir os testes de 
    * integração com o OPA.
    * Seus parâmetros definem um nome de teste e uma função de callback com
    * alguns objetos auxiliares, entre eles estão o:
    *   - Given: can call arrangememnt functions, carrega nosso component de app
    * para teste de integração;
    *   - When: possui custom actions para colocar o app num estado p testar o 
    * comportamento esperardo;
    *   - Then: possui custom assertions para remover o nosso componente novamente.
    */


  opaTest("Should open the Hello dialog", function (Given, When, Then) {
    // initialize the mock server
    mockserver.init();

    // Arrangements
    Given.iStartMyUIComponent({
      componentConfig: {
        name: "sap.ui.demo.walkthrough"
      }
    });

    //Actions
    When.onTheAppPage.iPressTheSayHelloWithDialogButton();

    // Assertions
    Then.onTheAppPage.iShouldSeeTheHelloDialog();

    // Cleanup
    Then.iTeardownMyApp();
  });
});

/**
 * Criamos um teste muito simples que simula um clique no botão
 * e espera que o dialogo seja aberto
 */