sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("nmspcpoc.poc.controller.View1", {
            onInit: async function () {
                sap.ui.core.BusyIndicator.show();
                var oView = this.getView("View1");
                var oModel = new sap.ui.model.json.JSONModel();
                var dataModel = this.getOwnerComponent().getModel("data");
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyyMMdd"
                });
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "M/d/yy"
                });
                var dataModel = this.getOwnerComponent().getModel("data");
                var McDate = oDateFormat.format(new Date());

                var todayRmrk = oDateFormat.format(new Date());
                var today = oDateFormat1.format(new Date());
                dataModel.setProperty("/valDateFormatted", today);

                //var lbl_exp = this.getView("View1").byId("lbl_exp_date0").setVisible=("false");


                //Se puede obtener el objeto que necesitamos modificar por medio del id del mismo objeto
                //this.getView("View1").byId("lbl_hddate").setText(dataModel.oData.valDate);

                //#region User
                var serviceCatUrl = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                var OdataServiceCat = new sap.ui.model.odata.ODataModel(serviceCatUrl, true);
                var serviceCatUrlPOC = " /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_POC_SRV/";
               // /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_POC_SRV/UnitStatDivision?Divis='*RGPP*'
                var OdataServiceCatPOC = new sap.ui.model.odata.ODataModel(serviceCatUrlPOC, true);
                var UsrData = "";

                if (!(typeof OdataServiceCat === "undefined") || !(typeof OdataServiceCat === "null")) {
                    //var usrOdata = this.getUserSrv(UsrModel);
                    //var usrSrv = await this.UsrRead(UsrModel, UsrData);
                    var usrSrv = await this.getUserSrv(OdataServiceCat, UsrData);
                    if (usrSrv[0].result === "ERROR") {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error((usrSrv[0].data));
                    }
                    else {


                        //#region WcdByDivision
                        //var servicetbl1Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                        //var Tbl1Model = new sap.ui.model.odata.ODataModel(serviceCatUrl, true);
                        var TblWcdData = "";
                        var WcdSrv = await this.getWcdSrv(OdataServiceCat, TblWcdData);
                        if (WcdSrv[0].result === "ERROR") {
                            sap.ui.core.BusyIndicator.hide();
                            MessageBox.error((WcdSrv[0].data));
                        }
                        else {
                            //#region UnitStatDivision
                            //var servicetbl2Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                            //var TblPusRepModel = new sap.ui.model.odata.ODataModel(servicetbl2Url, true);
                            var TblPusRepData = "";
                            var PusRepSrv = await this.getPusRepSrv(OdataServiceCatPOC, TblPusRepData);
                            if (PusRepSrv[0].result === "ERROR") {
                                sap.ui.core.BusyIndicator.hide();
                                MessageBox.error((PusRepSrv[0].data));

                            }
                            else {

                                var srvRmrksUrl = " /sap/opu/odata/sap/ZODATA_MC_WRDTREM_POC_SRV/";
                                var OdataSrvRmrks = new sap.ui.model.odata.ODataModel(srvRmrksUrl, true);
                                var RmrksData = "";
                                var rmrksSrv = await this.getRmrksSrv(OdataSrvRmrks, RmrksData);
                                if (rmrksSrv[0].result === "ERROR") {
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageBox.error((rmrksSrv[0].data));
                                }
                                else {

                                    var srvMidNgthConUrl = "/sap/opu/odata/sap/ZODATA_MC_WRPOC_SRV/";
                                    var OdataSrvData = new sap.ui.model.odata.ODataModel(srvMidNgthConUrl, true);
                                    var MidNgthCon = "";
                                    var MidNgthConSrv = await this.getMidNgthConSrv(OdataSrvData, RmrksData);
                                    if (MidNgthConSrv[0].result === "ERROR") {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageBox.error((MidNgthConSrv[0].data));
                                    }
                                    else {

                                        //Delta table start
                                        var TblWcdDataDelta = "";
                                        var WcdSrvDT = await this.getWcdSrvDelt(OdataServiceCat, TblWcdDataDelta);
                                        if (WcdSrvDT[0].result === "ERROR") {
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageBox.error((WcdSrvDT[0].data));
                                        }

                                        else {
                                            var TblPusRepDataDelta = "";
                                            var PusRepSrvDT = await this.getPusRepSrvDelt(OdataServiceCatPOC, TblPusRepDataDelta);
                                            if (PusRepSrvDT[0].result === "ERROR") {
                                                sap.ui.core.BusyIndicator.hide();
                                                MessageBox.error((PusRepSrvDT[0].data));

                                            }
                                            else {
                                                //San Luis table start
                                                var TblWcdDataSL = "";
                                                var WcdSrvSL = await this.getWcdSrvSL(OdataServiceCat, TblWcdDataSL);
                                                if (WcdSrvSL[0].result === "ERROR") {
                                                    sap.ui.core.BusyIndicator.hide();
                                                    MessageBox.error((WcdSrvSL[0].data));
                                                }

                                                else {
                                                    var TblPusRepDataSL = "";
                                                    var PusRepSrvSL = await this.getPusRepSrvSL(OdataServiceCatPOC, TblPusRepDataSL);
                                                    if (PusRepSrvSL[0].result === "ERROR") {
                                                        sap.ui.core.BusyIndicator.hide();
                                                        MessageBox.error((PusRepSrvSL[0].data));

                                                    }

                                                    else {//san joaquin table start

                                                        var TblPusRepDataSJ = "";
                                                        var PusRepSrvSJ = await this.getPusRepSrvSJ(OdataServiceCatPOC, TblPusRepDataSJ);
                                                        if (PusRepSrvSJ[0].result === "ERROR") {
                                                            sap.ui.core.BusyIndicator.hide();
                                                            MessageBox.error((PusRepSrvSJ[0].data));

                                                        }

                                                        else {

                                                            var TblWcdDataSJ = "";
                                                            var WcdSrvSJ = await this.getWcdSrvSJ(OdataServiceCat, TblWcdDataSJ);
                                                            if (WcdSrvSJ[0].result === "ERROR") {
                                                                sap.ui.core.BusyIndicator.hide();
                                                                MessageBox.error((WcdSrvSJ[0].data));
                                                            }

                                                            else {

                                                                //  Soutern table inicio
                                                                var TblWcdDataSou = "";
                                                                var WcdSrvSou = await this.getWcdSrvSou(OdataServiceCat, TblWcdDataSou);
                                                                if (WcdSrvSou[0].result === "ERROR") {
                                                                    sap.ui.core.BusyIndicator.hide();
                                                                    MessageBox.error((WcdSrvSou[0].data));
                                                                }
                                                                else {

                                                                    var TblPusRepDataSou = "";
                                                                    var PusRepSrvSou = await this.getPusRepSrvSou(OdataServiceCatPOC, TblPusRepDataSou);
                                                                    if (PusRepSrvSou[0].result === "ERROR") {
                                                                        sap.ui.core.BusyIndicator.hide();
                                                                        MessageBox.error((PusRepSrvSou[0].data));

                                                                    }

                                                                    else {
                                                                      

                                                                        //  Pine Flat WCD table inicio
                                                                        var TblWcdDataPine = "";
                                                                        var WcdSrvPine = await this.getWcdSrvPINE(OdataServiceCatPOC, TblWcdDataPine);
                                                                        if (WcdSrvPine[0].result === "ERROR") {
                                                                            sap.ui.core.BusyIndicator.hide();
                                                                            MessageBox.error((WcdSrvPine[0].data));
                                                                        }
                                                                        else {
                                                                             //  Pine Flat table inicio

                                                                            var TblPusRepDataPine = "";
                                                                            var PusRepSrvPine = await this.getPusRepSrvPine(OdataServiceCatPOC, TblPusRepDataPine);
                                                                            if (PusRepSrvPine[0].result === "ERROR") {
                                                                                sap.ui.core.BusyIndicator.hide();
                                                                                MessageBox.error((PusRepSrvPine[0].data));
        
                                                                            }
        
                                                                            else {

                                                                                 //  Reid Gardner Unit #4 Powerplant table inicio
                                                                                

                                                                                 var TblPusRepDataReid = "";
                                                                                 var PusRepSrvReid = await this.getPusRepSrvReid(OdataServiceCatPOC, TblPusRepDataReid);
                                                                                 if (PusRepSrvReid[0].result === "ERROR") {
                                                                                    sap.ui.core.BusyIndicator.hide();
                                                                                     MessageBox.error((PusRepSrvReid[0].data));
             
                                                                                 }
                                                                                else {
                                                                                    //  Reid Gardner WCD table inicio
                                                                                    var TblWcdDataReid = "";
                                                                                    var WcdSrvReid = await this.getWcdSrvReid(OdataServiceCatPOC, TblWcdDataReid);
                                                                                    if (WcdSrvReid[0].result === "ERROR") {
                                                                                        sap.ui.core.BusyIndicator.hide();
                                                                                        MessageBox.error((WcdSrvReid[0].data));
                                                                                    }
                                                                                    else {

                                                                                        dataModel = this.SetData(usrSrv, WcdSrv, PusRepSrv, rmrksSrv, MidNgthConSrv, McDate, dataModel, WcdSrvDT, PusRepSrvDT, WcdSrvSL, PusRepSrvSL
                                                                                            , WcdSrvSJ, PusRepSrvSJ, WcdSrvSou, PusRepSrvSou,WcdSrvPine,PusRepSrvPine,WcdSrvReid,PusRepSrvReid);
                
                                                                                            if (MidNgthConSrv[0].data.results[0].Mcdate === oDateFormat.format(new Date())) {
                                                                                        //if ("DUMMY" === oDateFormat.format(new Date())) {
                                                                                            var btnSb = oView.byId("btn_Submit");
                                                                                            btnSb.setEnabled(false);
                                                                                            MessageBox.warning("This form has been successfully submitted.\n\r" +
                                                                                                "No other midnight condition report for this date may be created or submitted");
                                                                                            dataModel.setProperty("/valSubmitted", "This form has been submitted")
                                                                                        }

                                                                                    }





                                                                                }



                                                                            }






                                                                        }
                                                                        




                                                                     


                                                                    }



                                                                }//  Soutern table fin






                                                            }


                                                        }  // san joaquin table fin









                                                    }
                                                }//San luis table fin



                                            }


                                        }




                                        //




                                    }
                                }
                            }


                        }




                    }


                }
                else {
                    MessageBox.error("Error with service: /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/");
                }

                var dummy = "";
                oModel.setData(null);
                oModel = dataModel;
                oView.setModel(oModel);
                sap.ui.core.BusyIndicator.hide();


                var object;
                //object = this.getView("View1").byId("ipt_CliftCourt6_elevation");
                object = oView.byId("ipt_JurCtrlChk21");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_JurCtrlChk21", "valJurCtrlChk", decAll);

            },
            getUserSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/USER_ADDRSet", {
                        //urlParameters: {
                        //  "$top" : 1
                        //},
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },

                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getWcdSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'WROR'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getPusRepSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'WROR'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getRmrksSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/ZWCM_MC_WRPOC_REMARKSSet", {
                        // urlParameters: {
                        //"Divis": "'WRSJ'"
                        //"$top" : 1
                        //},
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getMidNgthConSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/ZSWCM_MC_WRPOCSet", {
                        // urlParameters: {
                        //"Divis": "'WRSJ'"
                        //"$top" : 1
                        //},
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getWcdSrvDelt: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'WRDT'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getWcdSrvSL: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'WRSL'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getPusRepSrvDelt: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'WRDT'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getPusRepSrvSL: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'WRSL'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getPusRepSrvSJ: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'WRSJ'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getPusRepSrvSou: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'WRSC'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getWcdSrvSJ: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'WRSJ'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getWcdSrvSou: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'WRSC'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            postRmrksSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.create("/ZWCM_MC_WRPOC_REMARKSSet", data, {
                        // urlParameters: {
                        //"Divis": "'WRSJ'"
                        //"$top" : 1
                        //},
                        method: "POST",
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            postMidNgthConSrv: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.create("/ZSWCM_MC_WRPOCSet", data, {
                        // urlParameters: 
                        //"Divis": "'WRSJ'"
                        //"$top" : 1
                        //},
                        method: "POST",
                        success: (oData, oResponse) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oResponse });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getWcdSrvPINE: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'PFPP'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getPusRepSrvPine: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'*PFPP*'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            getWcdSrvReid: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/WcdByDivision", {
                        urlParameters: {
                            "Div": "'RGPP'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },

            getPusRepSrvReid: async function (UsrModel, data) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                const oPromise = await new Promise(function (resolve, reject) {
                    UsrModel.read("/UnitStatDivision", {
                        urlParameters: {
                            "Divis": "'*RGPP*'"
                            //"$top" : 1
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },


            SetData: function (userData, wcdData, plantData, rmrksData, MidCondData, date, model, WcdSrvDT, PusRepSrvDT, WcdSrvSL, PusRepSrvSL, WcdSrvSJ, PusRepSrvSJ, WcdSrvSou, PusRepSrvSou
                ,WcdSrvPine,PusRepSrvPine,WcdSrvReid,PusRepSrvReid) {
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "M/d/yy"
                });

                var today = oDateFormat1.format(new Date());
                var oView = this.getView("View1");
                var dataModel = model;
                var ctrllr = oView.getController();
                var obj = "";
                var UsrData = userData[0].data.results[0];

                dataModel.setProperty("/valDate", date);
                dataModel.setProperty("/valUsrName", UsrData.Bname);
                dataModel.setProperty("/valMcdate", date);
                dataModel.setProperty("/valDateFormatted", today);
                dataModel.setProperty("/valMandt", MidCondData[0].data.results[0].Mandt);

                dataModel.setProperty("/valOpName", UsrData.NameTextc);
                //#region POC
                dataModel.setProperty("/val_pocRem", rmrksData[0].data.results[0].Pocj)
                //#endregionPOC
                //#region Security Threat Levels
                var iconSec = oView.byId("SecThr_color");
                var iconDWR = oView.byId("SecDwr_color");

                switch (MidCondData[0].data.results[0].Natsec) {
                    case "NORMAL":
                        dataModel.setProperty("/val_lstStlNat", "keyStlNat1");
                        iconSec.setBackgroundColor("green");
                        iconSec.setColor("green");


                        break;
                    case "ELEVATED":
                        dataModel.setProperty("/val_lstStlNat", "keyStlNat2");
                        iconSec.setBackgroundColor("orange");
                        iconSec.setColor("orange");


                        break;
                    case "IMMINENT":
                        dataModel.setProperty("/val_lstStlNat", "keyStlNat3");
                        iconSec.setBackgroundColor("red");
                        iconSec.setColor("red");


                        break;
                    default:
                        dataModel.setProperty("/val_lstStlNat", "");
                        break;
                }

                switch (MidCondData[0].data.results[0].Isoreg) {
                    case "ON":
                        dataModel.setProperty("/val_lstCCISoReg", "keylstCCISoReg1");


                        break;
                    case "OFF":
                        dataModel.setProperty("/val_lstCCISoReg", "keylstCCISoReg2");

                        break;
                    default:

                        dataModel.setProperty("/val_lstCCISoReg", "");
                        iconDWR.setBackgroundColor("");
                        iconDWR.setColor("");
                        break;
                }


                switch (MidCondData[0].data.results[0].Dwrsec) {
                    case "NORMAL":
                        dataModel.setProperty("/val_lstStlDwr", "keyStlDwr1");
                        iconDWR.setBackgroundColor("green");
                        iconDWR.setColor("green");

                        //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                        //lbl.addStyleClass("cbx_green");
                        break;
                    case "ELEVATED":
                        model.setProperty("/val_lstStlDwr", "keyStlDwr2");
                        iconDWR.setBackgroundColor("orange");
                        iconDWR.setColor("orange");

                        //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                        //lbl.addStyleClass("cbx_orange");
                        break;
                    case "IMMINENT":
                        dataModel.setProperty("/val_lstStlDwr", "keyStlDwr3");
                        iconDWR.setBackgroundColor("red");
                        iconDWR.setColor("red");

                        //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                        //lbl.addStyleClass("cbx_red");
                        break;

                    default:

                        dataModel.setProperty("/val_lstStlDwr", "");
                        iconDWR.setBackgroundColor("");
                        iconDWR.setColor("");
                        break;
                }
                dataModel.setProperty("/val_wcd_table", wcdData[0].data.results);
                dataModel.setProperty("/val_plntt", plantData[0].data.results);
                dataModel.setProperty("/val_wcd_tableDT", WcdSrvDT[0].data.results);
                dataModel.setProperty("/val_plnttDT", PusRepSrvDT[0].data.results);

                dataModel.setProperty("/val_wcd_tableSL", WcdSrvSL[0].data.results);
                dataModel.setProperty("/val_plnttSL", PusRepSrvSL[0].data.results);

                dataModel.setProperty("/val_wcd_tableSJ", WcdSrvSJ[0].data.results);
                dataModel.setProperty("/val_plnttSJ", PusRepSrvSJ[0].data.results);


                dataModel.setProperty("/val_wcd_tableSou", WcdSrvSou[0].data.results);
                dataModel.setProperty("/val_plnttSou", PusRepSrvSou[0].data.results);

                dataModel.setProperty("/val_wcd_tablePine", WcdSrvPine[0].data.results);
                dataModel.setProperty("/val_Run_Pine", PusRepSrvPine[0].data.results);

                dataModel.setProperty("/val_wcd_tableReid", WcdSrvReid[0].data.results);
                dataModel.setProperty("/val_Run_PineReid", PusRepSrvReid[0].data.results);
 
                //#region Remarks
                dataModel.setProperty("/val_Remarks", rmrksData[0].data.results[0].Pocremarks)
                //#endregion Remarks


                return dataModel;
                //#endregion Security Threat Levels.


            },
            OnCbxChng: function (evt) {
                var view = this.getView("View1");
                var model = view.getModel();
                var secIcon = view.byId(evt.getSource().data("icon"));
                var cbxId = evt.getSource().data("cbxName");
                var dataSrc = evt.getSource().data("dataSource");
                var selKey = evt.getSource().data("selkey");
                var cbx = view.byId([cbxId]);
                var cbxJson = view.getModel().getData();
                var list = cbxJson[dataSrc];
                var flag = "";




                for (let index = 0; index < list.length; index++) {
                    if (list[index].text === cbx.getValue()) {
                        flag = "X";
                        break;
                    }

                }
                if (flag === "") {

                    sap.m.MessageBox.error("Select a valid value.");
                    cbxJson[selKey] = list[0].key.toString();
                    model.setData("");
                    model.setData(cbxJson);
                    view.setModel(model);
                }


                if (cbxId === "cbx_SecThreatLvls_nat" || cbxId === "cbx_SecThreatLvls_dwr") {
                    //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                    //var oView = this.getView("View1");
                    //var model = oView.getModel();
                    //var json = model.getData();
                    //var cbx = oView.byId(evt.getSource().data("obj_name"));
                    var val = cbx._getSelectedItemText();

                    //lbl.removeStyleClass("cbx_green");
                    //lbl.removeStyleClass("cbx_orange");
                    //lbl.removeStyleClass("cbx_red");



                    switch (val) {

                        case "NORMAL":
                            // lbl.addStyleClass("cbx_green");
                            secIcon.setBackgroundColor("green");
                            secIcon.setColor("green");
                            // exp_date["bOutput"]="invisible"; 
                            break;
                        case "ELEVATED":
                            // lbl.addStyleClass("cbx_orange");
                            secIcon.setBackgroundColor("orange");
                            secIcon.setColor("orange");
                            break;
                        case "IMMINENT":
                            //lbl.addStyleClass("cbx_red");
                            secIcon.setBackgroundColor("red");
                            secIcon.setColor("red");
                            break;
                        default:
                            if (cbxId === "cbx_SecThreatLvls_nat") {
                                model.setProperty("/keyStlNat1", "");
                            }
                            else {
                                model.setProperty("/keyStlNat2", "");
                            }
                            secIcon.setBackgroundColor("");
                            secIcon.setColor("");
                            break;
                    }
                }
                //if (cbx.value() && cbx.selectedIndex == -1) {
                //var dt = this.dataSource._data[0];
                //  cbx.text("");


            },

            onClear: function (evt) {
                /**var fid = evt.getSource().getId();
                var id = fid.split(/--/)
                var idt = id[2];
                idt = "ipt"+idt.substring(3,idt.length); TODO ESTO SE REEMPLAZA POR PARAMETRO*/
                var objid = evt.getSource().data("id");//Se obtiene el valor del parámetro enviado desde la vista "id"
                this.getView("View1").byId(objid).setValue("");
            },
            onAfterRendering: function () {
              
                //jQuery.sap.delayedCall(500, this, function () {  this.byId("iptAqDlv2230").focus(); });
                jQuery.sap.delayedCall(500, this, function () {  this.byId("lbl_hdstate").focus(); });
                //var dummy = "X";
            },
            onSubmit: async function (UsrModel, data) {
                var oView = this.getView("Index");
                var oThat = this;
                MessageBox.confirm("Are you ready to submit?", {
                    view: oView,
                    that: oThat,
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: async function (sAction) {
                        if (sAction === "OK") {


                            var PostMidNgthConUrl = "/sap/opu/odata/sap/ZODATA_MC_WRPOC_SRV/";
                            var Service = new sap.ui.model.odata.ODataModel(PostMidNgthConUrl, true);
                            //var submitJson = this.view.getModel().getData();
                            var oView = this.that.getView("View1");
                            var submitJson = oView.getModel().getData();
                            //var oView = this.view;
                            var submitJsonRmrk = submitJson;
                            var now = new Date();
                            var uuci;
                            var oEntry = {};
                            //#region Mapping
                            oEntry.Mandt = submitJson.valMandt;
                            oEntry.Mcdate = submitJson.valMcdate;
                            oEntry.Mctime = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
                            oEntry.Uname = submitJson.valUsrName;
                            oEntry.Pocj = submitJson.valMcdate + "WRPO" + "CPOCJ";
                            oEntry.Natsec = oView.byId("cbx_SecThreatLvls_nat").getValue();
                            oEntry.Dwrsec = oView.byId("cbx_SecThreatLvls_dwr").getValue();
                            oEntry.Pocremarks = submitJson.valMcdate + "WRPO" + "CPOCREMARKS";

                            //#endregion Mapping


                            var MidNgthCon = "";
                            var MidNgthConSrv = await this.that.postMidNgthConSrv(Service, oEntry);
                            if (MidNgthConSrv[0].result === "ERROR") {
                                MessageBox.error((MidNgthConSrv[0].data));
                            }
                            else {
                                var sserviceurlRmrks = "/sap/opu/odata/sap/ZODATA_MC_WRDTREM_POC_SRV/";
                                var oModelRmrks = new sap.ui.model.odata.ODataModel(sserviceurlRmrks, true);
                                //var submitJsonRmrk = oView.getModel().getData();
                                var oEntryRmrks = {};


                                var oEntryRmrks = {};
                                oEntryRmrks.Zcwmremkey = submitJsonRmrk.valMcdate + "WRPOC";
                                oEntryRmrks.Pocremarks = oView.byId("TxtRemarkText").getValue();
                                oEntryRmrks.Pocj = oView.byId("POC_JurisdRem").getValue();

                                var remarksSrv = await this.that.postRmrksSrv(oModelRmrks, oEntryRmrks);
                                if (remarksSrv[0].result === "ERROR") {
                                    MessageBox.error((remarksSrv[0].data));
                                }
                                else {
                                    //MessageBox.success("Data submitted successfully")
                                   var dataModel = this.that.getOwnerComponent().getModel("data");
                                    MessageBox.confirm("Data submitted successfully", {
                                        that1: this.that,
                                        view: oView,
                                        dataModelsbm:dataModel,
                                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                                        emphasizedAction: MessageBox.Action.OK,
                                        onClose: async function (sAction) {
                                            if (sAction === "OK") {
                                                var btnSb = this.that1.getView().byId("btn_Submit");
                                                //btnSb = view.byId("btn_Submit");
                                             
                                                btnSb.setEnabled(false);
                                                dataModel.setProperty("/valSubmitted", "This form has been submitted")
                                                //this.that1.onInit();
 
                                            }
                                        }
                                    })






                                }

                            }
                        }
                    }
                });


            },

        });
    });
