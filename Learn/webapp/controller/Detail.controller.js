/**
 * Define o contexto que passamos com o parametro de url invoicePath
 * p que o item seja exibido.
 * onInit: busca a insntancia do router e anexamos à rota de detalhe
 * com o metodo attachPatternMatched(), acessando pelo seu nome.
 * _onObjectMatched: function internal callback que será executada qnd
 * a rota for acessada de alguma forma. Neste método, recebemos um evento
 * que pode ser usado p acessar a url e os parametros de navegacao.
 * Acessamos o invoicePath e chamamos a função bindElement na view p definir
 * o contexto. O / tem q ser adicionado já que removemos no outro controller.
 * bindElement() cria um binding context p um controle e recebe o nome do model
 * + um path. Isso gera uma atualização de controles. Agora dara para ver os
 * detalhes da fatura numa pagina separada ao clicar num item.
 */

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"

], function (Controller, History, MessageToast, JSONModel) {
  "use strict";
  return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
    onInit: function () {
      var oViewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView().setModel(oViewModel, "view");

      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      this.byId("rating").reset(); //possibilita envio de outra classificação
      this.getView().bindElement({
        path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
        model: "invoice"
      });
    },

    /**
     * acessa o histórico de navegação, e determina o hash anterior.
     * Usa histórico do navegador para voltar à pagina anterior.
     * Caso no histórico n tenha nenhuma navegação feito ainda, volta
     * p a pagina inical.
     * o true (terceiro parametro) substitui o estado do historico p o atual.
     * o segundo paramemtro ({}), é vazio msm.
     */
    onNavBack: function () {
      var oHistory = History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("overview", {}, true);
      }
    },

    /**
     * onRatingChange lê o valor do nonsso custom change event
     * que é disparado qnd a classificação é enviada.
     * Dps, exibe uma msg de confirmação.
     */
    onRatingChange: function (oEvent) {
      var fValue = oEvent.getParameter("value");
      var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

      MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
    }
  });
});