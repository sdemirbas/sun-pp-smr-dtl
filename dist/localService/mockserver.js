sap.ui.define(["sap/ui/core/util/MockServer","sap/base/Log","sap/base/util/UriParameters","sap/ui/util/XMLHelper"],function(e,t,r,a){"use strict";var i,n="com/sun/pp/samplesummarydetail/",s=n+"localService/mockdata";return{init:function(){var o=new r(window.location.href),u=sap.ui.require.toUrl(s),p=sap.ui.require.toUrl(n+"manifest"+".json"),c="DetailSet",l=o.get("errorType"),f=l==="badRequest"?400:500,d=jQuery.sap.syncGetJSON(p).data,m=d["sap.app"].dataSources,g=m.mainService,h=sap.ui.require.toUrl(n+g.settings.localUri.replace(".xml","")+".xml"),x=/.*\/$/.test(g.uri)?g.uri:g.uri+"/",v=g.settings.annotations;i=new e({rootUri:x});e.config({autoRespond:true,autoRespondAfter:o.get("serverDelay")||1e3});i.simulate(h,{sMockdataBaseUrl:u,bGenerateMissingMockData:true});var U=i.getRequests(),q=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(o.get("metadataError")){U.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){q(500,"metadata Error",e)}})}if(l){U.forEach(function(e){if(e.path.toString().indexOf(c)>-1){q(f,l,e)}})}i.start();t.info("Running the app with mock data");if(v&&v.length>0){v.forEach(function(t){var r=m[t],i=r.uri,s=sap.ui.require.toUrl(n+r.settings.localUri.replace(".xml","")+".xml");new e({rootUri:i,requests:[{method:"GET",path:new RegExp("([?#].*)?"),response:function(e){sap.ui.require("jquery.sap.xml");var t=jQuery.sap.sjax({url:s,dataType:"xml"}).data;e.respondXML(200,{},a.serialize(t));return true}}]}).start()})}},getMockServer:function(){return i}}});