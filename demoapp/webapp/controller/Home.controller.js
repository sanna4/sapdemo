sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel) {
        "use strict";
        return Controller.extend("demoapp.controller.Home", {
            onInit: function () {
                var viewModel = new JSONModel({
                    inputValue: "Hello world!",
                    currencies: [
                        {
                            key: 'EUR',
                            text: 'Euro',
                            simbolo: '€',
                            cambio: 1
                        },
                        {
                            key: 'USD',
                            text: 'Dollaro',
                            simbolo: '$',
                            cambio: 0.95
                        },
                        {
                            key: 'GBP',
                            text: 'Sterlina',
                            simbolo: '£',
                            cambio: 1.16
                        },

                    ]
                });
                //modelName.setSizeLimit(10000);
                this.getView().setModel(viewModel, "viewModel");
                //this.getView().getModel("viewModel");
            },
            onBtnClick: function(oEvent) {
                var view = this.getView();
                var input = view.byId("field").getValue();
                MessageToast.show(input);
            },
            onInput: function(oEvent) {
                var value = oEvent.getSource().getValue();
                this.getView().byId("text").setText(value.toUpperCase());
            },
            showInput: function(oEvent) {
                MessageBox.alert(this.getView().getModel("viewModel").getProperty("/inputValue"),
                            {actions: ["Conferma"]});
            },
            onCurrSelect: function(oEvent) {
                var currs = this.getView().getModel("viewModel").getProperty("/currencies");
                var sCurr = currs.find(curr => curr.key === oEvent.getSource().getSelectedKey());
                if (sCurr.key === 'EUR') {
                    this.getView().byId("cambio").setVisible(false);
                } else {
                    this.getView().byId("cambio").setVisible(true);
                    this.getView().byId("cambio").setText("Valore cambio (€): " + sCurr.cambio);
                }
            },
            showCurrInfo: function(oEvent) {
                var currs = this.getView().getModel("viewModel").getProperty("/currencies");
                var sCurr = currs.find(curr => curr.key === this.getView().byId("list").getSelectedKey());
                MessageBox.information("Valuta: " + sCurr.text + "\n"
                                        + "Simbolo: " + sCurr.simbolo + "\n"
                                        + "Cambio (€): " + sCurr.cambio); 
            }
        });
    });
