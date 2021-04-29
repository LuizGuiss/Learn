/*global QUnit*/

/**
 * aqui está implememtado a unidade de teste do formatter custom.
 * O formatter (queremos testar) é carregado como uma dependência.
 * O ResourceModel vai testar se a tradução dos textos estão corretas.
 * beforeEach: instancia o ResouceBundle;
 * afterEach: destrói.
 * Estas duas funções são chamadas antes e dps de cada teste for executado.
 * 
 */

sap.ui.define([
  "sap/ui/demo/walkthrough/model/formatter",
  "sap/ui/model/resource/ResourceModel"
], function (formatter, ResourceModel) {
  "use strict";

  QUnit.module("Formatting functions", {
    beforeEach: function () {
      this._oResourceModel = new ResourceModel({
        bundleUrl: sap.ui.require.toUrl("sap/ui/demo/walkthrough") + "/i18n/i18n.properties"
      });
    },
    afterEach: function () {
      this._oResourceModel.destroy();
    }
  });


  QUnit.test("Should return the translated texts", function (assert) {

    /**
     * para n testar o controller, a view ou o model, primeiro, removemos as dependências
     * substituindo essas por "empty hulls (cascos vazios)" + stub()
     * o stub() é usado parar simular qlq comportmaento que precisarmos.
     * Os stubs de teste suportam o API de espionagem (testes) do SinonJS completo.
     */


    // Arrange
    // this.stub() does not support chaining and always returns the right data
    // even if a wrong or empty parameter is passed.
    var oModel = this.stub();
    oModel.withArgs("i18n").returns(this._oResourceModel);
    var oViewStub = {
      getModel: oModel
    };
    var oControllerStub = {
      getView: this.stub().returns(oViewStub)
    };


    // o stub é vinculado no formatter statusText
    // System under test
    var fnIsolatedFormatter = formatter.statusText.bind(oControllerStub);

    
    // verifica através do fnIsolatedFormmater() com os valores esperados do BD.
    // Assert
    assert.strictEqual(fnIsolatedFormatter("A"), "New", "The long text for status A is correct");

    assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The long text for status B is correct");

    assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The long text for status C is correct");

    assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for status Foo is correct");
  });

});