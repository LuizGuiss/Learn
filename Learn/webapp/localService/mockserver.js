sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
  "use strict";

  /**
   * o init cria uma instância do MockServer com o msm URL
   * das chamadas reais. O URL tem q ser o msm do manifest.json.
   * Depois, colocamos um delay de 1s para simular o delay do server.
   * Depois, simulamos um serciço com o oMockServer.simulate com o 
   * caminho do .xml. Assim, ele vai ler os dados de teste do sistema
   * para imitar o serviço real.
   * Por fim, basta startar
   */


  return {
    init: function () {
      // create
      var oMockServer = new MockServer({
        rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/"
      });

      var oUriParameters = new UriParameters(window.location.href);

      // configure mock server with a delay
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUriParameters.get("serverDelay") || 500
      });

      // simulate
      var sPath = "../localService";
      oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

      // start
      oMockServer.start();
    }
  };

});