/**
 * metadata: define a estrutura de dados e a API do controle. Cria
 * automaticamente métodos getter e setter e outras funções q podem
 * ser chamados dentro do app.
 * renderer: define uma estrutura html que vai ser adc na DOM do app
 * qnd o controle for instanciado numa view. O oRM é o render manager
 * do SAPUI5, pode ser usado para gravar strings e propriedades de 
 * controle no HTML
 * init: é uma função especial que pode ser usado p configurar o
 * controle e preparar o conteudo para exibir.
 */

/**
 * Controladores dos parametros:
 *  - RatingIndicator: usado p coletar a entrada do user no produto;
 *  - Label: exibe mais informações;
 *  - Button: envia a classificação ao app p armazená-la
 */

/** 
 * Metadata:
 *  - properties: definimos um valor de propriedade de controle que
 * manterá o valor que o user selecionou na classificação.
 *  - aggregations: 3 atributos de "controles ocultos" com 
 * multiplicidade falsa. Rating: controle da entrada do usuário,
 * label: exibir informações adicionais, 
 * button: botão para enviar a classificação.
 *  - events: evento de mudança que o controle vai disparar qnd a 
 * classificação for enviada. Contem o valor atual.
 */

/**
 * Init:
 * instanciamos os 3 controles e os armazenamentos de agregaçõa
 * interna com o setAggregation().
 * liveChange: evento para a classificação e para o click do botao.
 * Os textos do botão são referenciados no modelo i18n. 
 */

/**
 * Renderer:
 * tag div como externa.
 * writeControlData p renderizar o ID + outros atributos dentro da div.
 * Adicionamos uma classe css que é renderizadas pelo writeClasses.
 * Renderiza 3 controles internos com renderControl().
 * Fecha a tag div. 
 */

  /**
   * setValue: 
   * gera um setter que atualiza o valor da propriedade qnd chamado
   * num controlador ou definido no xml.
   * setProperty() pula a renderização p atualizar a propriedade do
   * controle 
   */

  /**
   * onRate:
   * chamado toda vez q o user altera a avaliação (rating).
   */

sap.ui.define([
  "sap/ui/core/Control",
  "sap/m/RatingIndicator",
  "sap/m/Label",
  "sap/m/Button"
], function (Control, RatingIndicator, Label, Button) {
  "use strict";
  return Control.extend("sap.ui.demo.walkthrough.control.ProductRating", {
    metadata: {
      properties: {
        value: { type: "float", defaultValue: 0 }
      },
      aggregations: {
        _rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
        _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
        _button: { type: "sap.m.Button", multiple: false, visibility: "hidden" }
      },
      events: {
        change: {
          parameters: {
            value: { type: "int" }
          }
        }
      }
    },
    init: function () {
      this.setAggregation("_rating", new RatingIndicator({
        value: this.getValue(),
        iconSize: "2rem",
        visualMode: "Half",
        liveChange: this._onRate.bind(this)
      }));
      this.setAggregation("_label", new Label({
        text: "{i18n>productRatingLabelInitial}"
      }).addStyleClass("sapUiSmallMargin"));
      this.setAggregation("_button", new Button({
        text: "{i18n>productRatingButton}",
        press: this._onSubmit.bind(this)
      }).addStyleClass("sapUiTinyMarginTopBottom"));
    },

    setValue: function (fValue) {
      this.setProperty("value", fValue, true);
      this.getAggregation("_rating").setValue(fValue);
    },

    reset: function () {
      var oResourceBundle = this.getModel("i18n").getResourceBundle();

      this.setValue(0);
      this.getAggregation("_label").setDesign("Standard");
      this.getAggregation("_rating").setEnabled(true);
      this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
      this.getAggregation("_button").setEnabled(true);
    },

    _onRate: function (oEvent) {
      var oRessourceBundle = this.getModel("i18n").getResourceBundle();
      var fValue = oEvent.getParameter("value");

      this.setProperty("value", fValue, true);

      this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
      this.getAggregation("_label").setDesign("Bold");
    },

    _onSubmit: function (oEvent) {
      var oResourceBundle = this.getModel("i18n").getResourceBundle();

      this.getAggregation("_rating").setEnabled(false);
      this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
      this.getAggregation("_button").setEnabled(false);
      this.fireEvent("change", {
        value: this.getValue()
      });
    },
    renderer: function (oRm, oControl) {
      oRm.openStart("div", oControl);
      oRm.class("myAppDemoWTProductRating");
      oRm.openEnd();
      oRm.renderControl(oControl.getAggregation("_rating"));
      oRm.renderControl(oControl.getAggregation("_label"));
      oRm.renderControl(oControl.getAggregation("_button"));
      oRm.close("div");
    }
  });
});