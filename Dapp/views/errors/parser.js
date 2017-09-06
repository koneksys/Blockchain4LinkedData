function RDF() {
	var RDF_NS="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
	var RDFS_NS="http://www.w3.org/2000/01/rdf-schema#";

	this.Version="0.38";
	var _rdfNS="";
	var _rdfsNS="";
	var GlobalID=0;
	var genids=[];
	var inTriples=[];
	var Namespaces=[];
	var xmld=null;
	var xml=null;
	this.Match=Match;
	this.getSingleObject=SingleObject;
	this.getSingleObjectResource=SingleObjectResource;
	this.toNTriples = function() {
	    var str=[];
    	for (var i=0;i<inTriples.length;i++) {
    		str.push(inTriples[i].toNTriple());
    	}
    	return str.join('');
	};
  this.setTriples = function(mytriples) {
		inTriples=mytriples;
	};
  this.addTriples = function(mytriples){
		var myl=mytriples.length;
		for (var i=0;i<myl;i++) {
			inTriples.push(mytriples[i]);
		}
	};
  this.subProperty = doSubProperties;
	this.getRDFURL=getRDF;
	this.postRDFURL=postRDF;
	this.getRDFNode=GetTriplesNode;
	this.loadRDFXML=_loadRDFXML;
	this.getTriples=function() { return inTriples; };
	var callbackfunction=null;
	var errorfunction=null;
	var baseURL='';
	var doSeeAlso=false;
	var URIS=[];
	var visitedURIS=[];
	function getRDF(url,func,seeAlso,errorfn) {
		// Remove any trailing slashes from URL.
		if (typeof url=='object') {
			URIS=url.splice(1,url.length);
			url=url[0];
		}
		url = url.replace(/\/*$/,'');
		callbackfunction=func;
		errorfunction=errorfn;
		if (url.indexOf('#')==-1) {
			baseURL=url;
		} else {
			baseURL=url.substr(0,url.indexOf('#'));
		}
		if (seeAlso) {
			doSeeAlso=true;
		}
		visitedURIS[url]=true;
		getURL(url,ReturnRDF,errorfunction);
	}

	function postRDF(url,txt,func,type,enc) {
		// Remove any trailing slashes from URL.
		if (typeof url=='object') {
			URIS=url.splice(1,url.length);
			url=url[0];
		}
		url = url.replace(/\/*$/,'');
		callbackfunction=func;
		if (url.indexOf('#')==-1) {
			baseURL=url;
		} else {
			baseURL=url.substr(0,url.indexOf('#'));
		}
		visitedURIS[url]=true;
		postURL(url,txt,ReturnRDF,type,enc,errorfunction);
	}

 function ReturnRDF(obj) {
  var gettriples = null;
  if (typeof parseXML=='undefined') {
		try {
			xml=new ActiveXObject ("Microsoft.XMLDOM");
			xml.async=false;
			xml.validateOnParse=false;
			xml.resolveExternals=false;
			xml.loadXML(obj.content);
		} catch (e) {
			if (obj.domcontent) {
				xml=obj.domcontent;
			} else {
				try {
					Document.prototype.loadXML = function (s) {
						var doc2 = (new DOMParser()).parseFromString(s, "text/xml");
						while (this.hasChildNodes()) { this.removeChild(this.lastChild); }
						for (var i = 0; i < doc2.childNodes.length; i++) {
							this.appendChild(this.importNode(doc2.childNodes[i], true));
						}
					};
					xml=document.implementation.createDocument('', '', null);
					xml.loadXML(obj.content);
				} catch (e) {
					if (errorfunction) { errorfunction({message:"OK, I give up, you're not ASV, Batik, IE or\n a Mozilla build or anything else a bit like them."}); }
					return;
				}
			}
		}
	} else {
		try {
			xml=parseXML(obj.content,null);
		} catch (e){}
		if (''+xml=='null') {
			xml=parseXML(obj.content,SVGDoc);
			// Batik area...
		}
	}
	try {
		xmld=xml.documentElement;
		if (xml.documentElement.childNodes) {
			gettriples=true;
		}
	} catch (E) {
		try {
			xmld=xml.childNodes.item(0);
			gettriples=true;
  	} catch (E) {
			if (errorfunction) {
				errorfunction({message:"No XML Document Found, or not valid XML, or something\n Basically an error so I'm giving up."});
			}
			gettriples=false;
			return;
		}
 	}
  if (gettriples) {
		GetTriples(inTriples.length);
	}
  if (doSeeAlso) {
		doSeeAlsos();
	}
  if (URIS.length==0) {
		doSubProperties();
		doOwlSameAs();
		callbackfunction();
	}
	if (URIS.length>0) {
		var url=URIS.pop();
		if (!visitedURIS[url]) {
  		if (url.indexOf('#')==-1) {
				baseURL=url;
			} else {
				baseURL=url.substr(0,url.indexOf('#'));
			}
			doSeeAlso=false;
			getURL(url,ReturnRDF,errorfunction);
		}
	}
 }

 function _loadRDFXML(xmltxt) {
	 var gettriples = null;
	 if (typeof parseXML=='undefined') {
		 try {
			 xml=new ActiveXObject ("Microsoft.XMLDOM");
			 xml.async=false;
			 xml.validateOnParse=false;
			 xml.resolveExternals=false;
			 xml.loadXML(xmltxt);
		 } catch (e) {
			 try {
				 Document.prototype.loadXML = function (s) {
					 var doc2 = (new DOMParser()).parseFromString(s, "text/xml");
					 while (this.hasChildNodes()) {
						 this.removeChild(this.lastChild);
					 }
					 for (var i = 0; i < doc2.childNodes.length; i++) {
						 this.appendChild(this.importNode(doc2.childNodes[i], true));
					 }
				 };
				 xml=document.implementation.createDocument('', '', null);
				 xml.loadXML(xmltxt);
			 } catch (e) {
				 if (errorfunction) { errorfunction({message:"OK, I give up, you're not ASV, Batik, IE or\n a Mozilla build or anything else a bit like them."}); }
				 return;
			 }
		 }
	 } else {
		 xml=parseXML(xmltxt,null);
	 }
	 try {
		 if (xml.documentElement.childNodes) {
			 gettriples=true;
		 }
	 } catch (E) {
		 if (errorfunction) {
			 errorfunction({message:"No XML Document Found."});
			 gettriples=false;
			 return;
		 }
	 }
	 if (gettriples) {
		 GetTriples();
	 }
 }

function GetTriples(offset) {
  getNamespaces(xmld);
  var xmlbase=xmld.getAttribute('xml:base');
	if (xmlbase && xmlbase!='') {
		baseURL=xmlbase;
	}
  createPredicates(xmld.childNodes);
  for (var j=offset;j<inTriples.length;j++) {
		var it=inTriples[j];
		if (!it.object) { it.object=""; it.type="literal"; }
		var its=it.subject;
		if (its.indexOf('#')==0 || (its.length==0 && it.type=="resource")) {
			it.subject=baseURL+its;
		}
		if ((it.object.indexOf(':')==-1 || it.object.length==0) && it.type=="resource") {
			if (it.object.indexOf('#')==0) {
				it.object=baseURL+it.object;
			}	else {
				it.object=baseURL.substr(0,baseURL.lastIndexOf('/')+1)+it.object;
			}
	  }
		if (it.type!="literal" && it.object==RDF_NS+"Description") {
			inTriples.splice(j--,1);
		}
	}
 	for (var i=0;i<genids.length;i++) {
		if (genids[i].subject) {
			var g=genids[i].id;
			for (j=offset;j<inTriples.length;j++) {
				if (inTriples[j].subject==g) {
					inTriples[j].subject=genids[i].subject;
				}
				if (inTriples[j].object==g) {
					inTriples[j].object=genids[i].subject;
				}
			}
		}
 	}
  return inTriples;
 }
 function GetTriplesNode(node,baseURL) {
	 xml=node.getOwnerDocument();
	 getNamespaces(xmld);
	 createPredicates(node.childNodes);
	 for (var i=0;i<genids.length;i++) {
		 var g=genids[i].id;
		 for (var j=0;j<inTriples.length;j++) {
			 if (inTriples[j].subject==g) {
				 inTriples[j].subject=genids[i].subject;
			 }
			 if (inTriples[j].object==g) {
				 inTriples[j].object=genids[i].subject;
			 }
			 if (inTriples[j].subject.indexOf('#')==0 || inTriples[j].subject.length==0) {
				 inTriples[j].subject=baseURL+inTriples[j].subject;
			 }
			 if (inTriples[j].object.indexOf('#')==0 || inTriples[j].object.length==0) {
				 inTriples[j].object=baseURL+inTriples[j].object;
			 }
		 }
	 }
	 return inTriples;
 }

 function getAttributeWrap(node, ns, name) {
	 var vl;
	 if (typeof node.getAttributeNS=='unknown' | typeof node.getAttributeNS=='function') {
		 vl=node.getAttributeNS(Namespaces['_'+ns],name);
	 } else {
		 vl=node.getAttribute(ns+':'+name);
	 }
	 return vl;
 }

 function createPredicates(els) {
	 var el,i,j,attr,nn,nv,attrs,ns,subject,vl,ses;
	 for (i=0;i<els.length;i++) {
		 subject=GenID();
		 el=els.item(i);
		 while (el && el.nodeType!=1) {
			 el=els.item(++i);
		 }
		 if (el) {
			 getNamespaces(el);
			 attrs=el.attributes;
			 if (typeof el.getAttributeNS=='unknown' | typeof el.getAttributeNS=='function') {
				 vl=el.getAttributeNS(RDF_NS,'about');
				 if (!vl) {
					 vl=el.getAttributeNS(RDF_NS,'ID');
					 if (vl) {
						 vl='#'+vl;
					 }
					 if (!vl) {
						 vl=el.getAttributeNS(RDF_NS,'nodeID');
						 if (vl) {
							 vl='genid:'+vl;
						 }
					 }
				 }
			 } else {
				 vl=el.getAttribute(_rdfNS+':about');
				 if (!vl) {
					 vl=el.getAttribute(_rdfNS+':ID');
					 if (vl) {
						 vl='#'+vl;
					 }
					 if (!vl) {
						 vl=el.getAttribute(_rdfNS+':nodeID');
						 if (vl) {
							 vl='genid:'+vl;
						 }
					 }
				 }
			 }
			 if (vl && vl!='') {
				 subject=vl;
			 }
			 for (j=0;j<attrs.length;j++) {
				 attr=attrs.item(j);
				 nn=String(':'+attr.nodeName+'::').split(':');
				 ns=nn[1];
				 nn=nn[2];
				 nv=attr.nodeValue;
				 if (ns!=_rdfNS && ns!='xmlns') {

					 inTriples.push(new Triple(subject,Namespaces['_'+ns]+nn,nv,"literal"));
				 }
				 if (ns==_rdfNS && nn=='about') {
					 genids.push({id:subject,subject:nv});
					 if (!(Namespaces['_'+_rdfNS]+"type"=="http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && Namespaces['_'+ns]+el.nodeName=="http://www.w3.org/1999/02/22-rdf-syntax-ns#rdf:Description")) {
					 }
				 }
			 }
		 }
		 if (el) {
			 nn=String(':'+el.nodeName+'::').split(':');
			 ns=nn[1];
			 nn=nn[2];
			 if (ns!=_rdfNS) {
				 if (el.nodeName.indexOf(':')==-1) {
					 ses=['','',el.nodeName];
				 } else {
					 ses=String(':'+el.nodeName+'::').split(':');
				 }
				 inTriples.push(new Triple(subject,Namespaces['_'+_rdfNS]+"type",Namespaces['_'+ses[1]]+ses[2],"resource"));
			 }
		 }
		 if (el && el.childNodes) {
			 AnalyseChildren(subject,el.childNodes);
		 }
	 }
 }

 function getVL(el) {
	 if (typeof el) {
		 return "";
	 }
	 var vl;
	 if (typeof el.getAttributeNS=='unknown' | typeof el.getAttributeNS=='function') {
		 vl=el.getAttributeNS(RDF_NS,'about');
		 if (!vl) {
			 vl=el.getAttributeNS(RDF_NS,'ID');
			 if (vl) {
				 vl='#'+vl;
			 }
		 }
	 } else {
		 vl=el.getAttribute(_rdfNS+':about');
		 if (!vl) {
			 vl=el.getAttribute(_rdfNS+':ID');
			 if (vl) {
				 vl='#'+vl;
			 }
		 }
	 }
	 return vl;
 }

 function AnalyseChildren(subject,els) {
	 var liCount=1;
	 var el,i,j,attr,attr1,nn,nna,nn1,nna1,nv,nva,nv1,nva1,nvobj,attrs,ns,nsa,ns1,nsa1,elsl,vl,typ,datatype,lang,elf;
	 if (els) {
		 elsl=els.length;
		 for (i=0;i<elsl;i++) {
			 el=els.item(i);
			 while (el && el.nodeType!=1) {
				 el=els.item(++i);
			 }
			 if (el) {
				 getNamespaces(el);
				 nn=el.nodeName;
				 attrs=el.attributes;
				 vl=getVL(el);
				 if (vl && vl!='') {
					 subject=vl;
				 }
				 for (j=0;j<attrs.length;j++) {
					 attr=attrs.item(j);
					 nna=String(':'+attr.nodeName+'::').split(':');
					 nsa=nna[1];
					 nna=nna[2];
					 nva=attr.nodeValue;
					 if (nsa!=_rdfNS && nsa!='xmlns') {
						 if (Namespaces['_'+nsa]) {
							 // RDFSLabel error
							 if (nsa==_rdfsNS && nna=="label") {
								 var resource=getAttributeWrap(el, _rdfNS, "resource");
								 inTriples.push(new Triple(resource,Namespaces['_'+nsa]+nna,nva,"literal"));
							 } else {
								 inTriples.push(new Triple(subject,Namespaces['_'+nsa]+nna,nva,"literal"));
							 }
						 }
					 }
					 if (nsa==_rdfNS && nna=='about') {
						 var mysubject=nva;
						 genids.push({id:subject,subject:nva});
						 if (!(Namespaces['_'+_rdfNS]+"type"=="http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && Namespaces['_'+ns]+el.nodeName=="http://www.w3.org/1999/02/22-rdf-syntax-ns#rdf:Description")) {
							 inTriples.push(new Triple(subject,Namespaces['_'+_rdfNS]+"about",mysubject,"resource"));
						 }
					 }
				 }
				 if (nn.indexOf(':')==-1) {
					 ns='';
				 } else {
					 ns=nn.split(':')[0];
					 nn=nn.split(':')[1];
				 }
				 nvobj=getNodeValue(el);
				 nv=nvobj.val;typ=nvobj.type;datatype=nvobj.datatype;lang=nvobj.lang;
				 if (ns==_rdfNS && nn=='Description') {
					 elf=el.firstChild;
						 if (elf) {
							 try {
								 nn1=String(':'+elf.nodeName+'::').split(':');
								 ns1=nn1[1];
								 nn1=nn1[2];
								 for (var ii=0;ii<elf.attributes.length;ii++) {
									 attr1=elf.attributes.item(ii);
									 nna1=String(':'+attr1.nodeName+'::').split(':');
									 nsa1=nna1[1];
									 nna1=nna1[2];
									 nva1=attr1.nodeValue;
									 if (nsa1!=_rdfNS && nsa1!='xmlns') {
										 inTriples.push(new Triple(subject,Namespaces['_'+nsa1]+nna1,nva1,"literal"));
									 }
									 if (nsa1==_rdfNS && nna1=='resource') {
										 ii=1000;
										 inTriples.push(new Triple(subject,Namespaces['_'+ns1]+nn1,nva1,'resource'));
									 }
									 if (nsa1==_rdfNS && nna1=='literal') {
										 ii=1000;
										 inTriples.push(new Triple(subject,Namespaces['_'+nsa1]+nn1,nv1,'resource'));
									 }
								 }
								 if (ii<1000) {
									 inTriples.push(new Triple(subject,Namespaces['_'+ns1]+nn1,elf.nodeValue,'resource'));
								 }
							 } catch (e) {}
						 }
				 } else {
					 if (typeof el.getAttributeNS=='unknown' | typeof el.getAttributeNS=='function') {
						 vl=el.getAttributeNS(RDF_NS,'nodeID');
						 if (vl) {
							 nv='genid:'+vl;
						 }
					 } else {
						 vl=el.getAttribute(_rdfNS+':nodeID');
						 if (vl) {
							 nv='genid:'+vl;
						 }
					 }
					 if (ns==_rdfNS & nn=="li") {
						 inTriples.push(new Triple(subject,Namespaces['_'+ns]+"_"+(liCount++),nv,typ,datatype,lang));

					 } else {
						 inTriples.push(new Triple(subject,Namespaces['_'+ns]+nn,nv,typ,datatype,lang));
					 }
				 }
			 }
		 }
	 }
 }

 function getFCVal(el) {
	 if (!el.firstChild) {
		 return '';
	 }
	 if (el.firstChild.xml) {
		 return el.firstChild.xml;
	 } else {
		 return el.firstChild.nodeValue;
	 }
 }
 function getNodeValue(el) {
	 getNamespaces(el);
	 var j,attrs,attrs2,attr,els,elsl2,subj,predicate,nn,ns,nv,vl,nna1,nsa1,nva1;
	 attrs=el.attributes;
	 predicate="";
	 for (j=0;j<attrs.length;j++) {
		 attr=attrs.item(j);
		 nn=String(':'+attr.nodeName+'::').split(':');
		 ns=nn[1];
		 nn=nn[2];
		 nv=attr.nodeValue;
		 if (ns==_rdfNS && nn=='parseType' && nv=='Resource') {
			 subj=GenID();
			 AnalyseChildren(subj,el.childNodes);
			 return {val:subj,type:'resource'};
		 }
		 if (ns==_rdfNS && nn=='datatype') {
			 try {
				 return {val:getFCVal(el),type:'literal',datatype:nv};
			 }catch (e) {
				 return {val:"",type:'literal',datatype:nv};
			 }
		 }
		 if (ns=='xml' && nn=='lang') {
			 return {val:getFCVal(el),type:'literal',lang:nv};
		 }
		 if (ns==_rdfNS && nn=='about') {
			 return {val:nv,type:'resource'};
		 }
		 if (ns==_rdfNS && nn=='resource') {
			 return {val:nv,type:'resource'};
		 }
		 if (ns==_rdfNS && nn=='literal') {
			 return {val:getFCVal(el),type:'literal'};
		 }
	 }
	 els=el.childNodes;
	 elsl2=els.length;
	 if (elsl2==0) {
		 return "";
	 }
	 if (elsl2==1 && els.item(0).nodeType==3) {
		 return {val:els.item(0).nodeValue,type:'literal'};
	 }
	 var iii=0;
	 while (els.item(iii) && els.item(iii).nodeType==3) {
		 iii++;
	 }
	 var elsi=els.item(iii);
	 subj=GenID();
	 if (elsi!=null) {
		 nn=String(':'+elsi.nodeName+'::').split(':');
		 if (nn.length==4) {
			 ns="";nn=nn[1];
		 } else {
			 ns=nn[1];
			 nn=nn[2];
		 }

		 vl=getVL(elsi);
		 if (vl && vl!='') {
			 subj=vl;
		 }
		 inTriples.push(new Triple(subj,Namespaces['_'+_rdfNS]+"type",Namespaces['_'+ns]+nn,"resource"));
		 attrs2=elsi.attributes;
		 if (attrs2) {
			 for (var ii=0;ii<attrs2.length;ii++) {
				 attr=attrs2.item(ii);
				 nna1=String(':'+attr.nodeName+'::').split(':');
				 nsa1=nna1[1];
				 nna1=nna1[2];
				 nva1=attr.nodeValue;
				 if (nsa1!=_rdfNS && nsa1!='xmlns') {
					 inTriples.push(new Triple(subj,Namespaces['_'+nsa1]+nna1,nva1,"literal"));
				 }
			 }
			 if ((typeof elsi.getAttributeNS=='unknown' | typeof elsi.getAttributeNS=='function') && elsi.getAttributeNS(RDF_NS,'about')!='') {
				 genids.push({id:subj,subject:elsi.getAttributeNS(RDF_NS,'about')});
			 } else {
				 if (elsi.getAttribute(_rdfNS+':about')!='') {
					 genids.push({id:subj,subject:elsi.getAttribute(_rdfNS+':about')});
				 }
			 }
		 }
		 AnalyseChildren(subj,elsi.childNodes);
	 }
	 return {val:subj,type:'resource'};
 }

 function GenID() {
	 return "genid:"+(++GlobalID);
 }

 function getNamespaces(el) {
	 if (el) {
		 var nn,ns;
		 var attr=el.attributes;
		 if (attr) {
			 var atl=attr.length;
			 for (var i=0;i<atl;i++) {
				 nn=':'+attr.item(i).nodeName+"::";
				 nn=nn.split(':')[2];
				 ns=attr.item(i).nodeValue;
				 Namespaces[Namespaces.length]=ns;
				 Namespaces['_'+nn]=Namespaces[Namespaces.length-1];
				 if (ns==RDF_NS) {
					 _rdfNS=nn;
				 }
				 if (ns==RDFS_NS) {
					 _rdfsNS=nn;
				 }
			 }
		 }
	 }
 }


 function SubjectOrObject(triples,uri) {
	if (triples==null) {
		triples=inTriples;
	}
	var outTriples=[];
	for (var i=0;i<triples.length;i++) {
		var ti=triples[i];
		if (ti.subject==uri || ti.object==uri) {
			outTriples.push(ti);
		}
	}
	return outTriples;
 }

function Match(triples,s,p,o) {
	if (triples==null) {
		triples=inTriples;
	}
	var outTriples=[];
	for (var i=0;i<triples.length;i++) {
		var ti=triples[i];
		var match=true;
		if (!(s==null || ti.subject==s)) {
			match=false;
		}
		if (!(p==null || ti.predicate==p)) {
			match=false;
		}
		if (!(o==null || ti.object==o)) {
			match=false;
		}
		if (match) {
			outTriples.push(ti);
		}
	}
	return outTriples;
 }


function SingleObject(triples,s,p,o) {
	if (triples==null) {
		triples=inTriples;
	}
	for (var i=0;i<triples.length;i++) {
		var ti=triples[i];
		var match=true;
		if (!(s==null || ti.subject==s)) {
			match=false;
		}
		if (!(p==null || ti.predicate==p)) {
			match=false;
		}
		if (match) {
			return(ti.object);
		}
	}
	return null;
 }

function SingleObjectResource(triples,s,p,o) {
	if (triples==null) {
		triples=inTriples;
	}
	var tl=triples.length;
	for (var i=0;i<tl;i++) {
		var ti=triples[i];
		var match=true;
		if (!(s==null || ti.subject==s)) {
			match=false;
		}
		if (!(p==null || ti.predicate==p)) {
			match=false;
		}
		if (!(ti.type=='resource')) {
			match=false;
		}
		if (match) {
			return(ti.object);
		}
	}
	return null;
 }

 function doOwlSameAs(triples) {
	 var i, j, tri;
	 if (triples==null) {
		 triples=inTriples;
	 }
	 var subs=Match(triples,null,"http://www.w3.org/2002/07/owl#sameAs",null);
	 for (i=0;i<subs.length;i++) {
		 var subjects=SubjectOrObject(triples,subs[i].subject);
		 var objects=SubjectOrObject(triples,subs[i].object);
		 for (j=0;j<subjects.length;j++) {
			 tri=subjects[j];
			 if (tri.predicate!="http://www.w3.org/2002/07/owl#sameAs") {
				 triples.push(replaceTriple(tri,subs[i].subject,subs[i].object));
			 }
		 }
		 for (j=0;j<objects.length;j++) {
			 tri=objects[j];
			 if (tri.predicate!="http://www.w3.org/2002/07/owl#sameAs") {
				 triples.push(replaceTriple(tri,subs[i].subject,subs[i].object));
			 }
		 }
	 }
 }
 function replaceTriple(tri,subj,obj) {
	 var s=tri.subject;
	 var o=tri.object;
	 if (s==subj) {
		 s=obj;
	 } else {
		 if (s==obj) {
			 s=subj;
		 }
	 }
	 if (o==subj) {
		 o=obj;
	 } else {
		 if (o==obj) {
			 o=subj;
		 }
	 }
	 return new Triple(s,tri.predicate,o,tri.type,tri.datatype,tri.lang);
 }

 function doSubProperties(triples) {
	 if (triples==null) {
		 triples=inTriples;
	 }
	 var subs=Match(triples,null,RDFS_NS+"subPropertyOf",null);
	 for (var i=0;i<subs.length;i++) {
		 var props=Match(triples,null,subs[i].subject,null);
		 for (var j=0;j<props.length;j++) {
			 triples.push(new Triple(props[j].subject,subs[i].object,props[j].object,props[j].type));
		 }
	 }
 }

 function doSeeAlsos() {
	 var subs=Match(inTriples,null,RDFS_NS+"seeAlso",null);
	 for (var i=0;i<subs.length;i++) {
		 if (!URIS[subs[i].object]) {
			 URIS.push(subs[i].object);
			 URIS[subs[i].object]=URIS[URIS.length-1];
		 }
	 }
 }


function HTTP() {
	var xmlhttp;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
		try {
		xmlhttp=new ActiveXObject("Msxml2.XMLHTTP")
		} catch (e) {
		try {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
		} catch (E) {
    xmlhttp=false
		}
		}
		@else
		xmlhttp=false
		@end @*/
	if (!xmlhttp) {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			xmlhttp=false;
		}
	}
	return xmlhttp;
 }

 if (typeof getURL=='undefined') {
	 getURL=function(url,fn,errorfn) {
		 var xmlhttp=new HTTP();
		 if (xmlhttp) {
			 xmlhttp.open("GET",url,true);
			 xmlhttp.onreadystatechange=function() {
				 if (xmlhttp.readyState==4) {
					if (xmlhttp.status == 200) {
						fn({status:xmlhttp.status,content:xmlhttp.responseText,
									domcontent:xmlhttp.responseXML,
									contentType:xmlhttp.getResponseHeader("Content-Type")});
					} else {
						if (typeof errorfn!=null) {
							errorfn({status:xmlhttp.status,content:xmlhttp.responseText,
									domcontent:xmlhttp.responseXML,
									contentType:xmlhttp.getResponseHeader("Content-Type")});
						}
					}
				 }
			 };
			 xmlhttp.send(null);
		 } else {
			 //Some Appropriate Fallback...
			 if (errorfunction) {
				 errorfunction({message:"OK, I give up, you're not ASV, Batik, IE or\n a Mozilla build or anything else a bit like them."});
			 }
		 }
	 };
 }
 if (typeof postURL=='undefined') {
	 postURL=function(url,txt,fn,type,enc,errorfn) {
		 var xmlhttp=new HTTP();
		 if (xmlhttp) {
			 xmlhttp.open("POST",url,true);
			 if (enc) { xmlhttp.setRequestHeader("Content-Encoding",enc); }
			 if (type == null) type = "application/x-www-form-urlencoded";
			 xmlhttp.setRequestHeader("Content-Type",type);
			 xmlhttp.onreadystatechange=function() {
			 if (xmlhttp.readyState==4) {
				 fn({status:xmlhttp.status,content:xmlhttp.responseText,
								domcontent:xmlhttp.responseXML,
								contentType:xmlhttp.getResponseHeader("Content-Type")});
				 }
			 };
			 xmlhttp.send(txt);
		 } else {
			 //Some Appropriate Fallback...
			 if (errorfunction) {
				 errorfunction({message:"OK, I give up, you're not ASV, Batik, IE or\n a Mozilla build or anything else a bit like them."});
			 }
		 }
	 };
 }
}


Array.prototype.toNTriples=function() {
	var str=[];
	for (var i=0;i<this.length;i++) {
		str.push(this[i].toNTriple());
	}
	return str.join('');
};


	Array.prototype.toNTriplesExpand=function(rdf) {
		var str='';
		for (var i=0;i<this.length;i++) {
			if (this[i].subject.indexOf('genid')==0) {
				str+='_:n'+this[i].subject.substr(6)+' ';
			} else {
				str+='<'+this[i].subject+'> ';
			}
			str+='<'+this[i].predicate+'> ';
			if (this[i].type=='literal') {
				str+='"'+this[i].object+'"';
			} else {
				if (this[i].object && this[i].object.indexOf('genid')==0) {
					str+='_:n'+this[i].object.substr(6)+'';
					str+=rdf.Match(null,this[i].object,null,null).toNTriplesExpand(rdf);
				} else {
					str+='<'+this[i].object+'>';
				}
			}
			str+='.\n';
		}
		return str;
	};

 function Triple(subject,predicate,object,type,datatype,lang) {
	 this.subject=subject;
	 this.predicate=predicate;
	 this.object=object;
	 this.type=type;
	 this.lang=lang;
	 this.datatype=datatype;
	 return this;
}

 Triple.prototype.toNTriple=function() {
		var str = [];
		if (this.subject && this.subject.indexOf('genid')==0) {
			str.push('_:n'+this.subject.substr(6)+' ');
		} else {
			str.push('<'+this.subject+'> ');
		}
		str.push('<'+this.predicate+'> ');
		if (this.type=='literal') {
			if (this.datatype) {
				str.push('"'+this.object+'"^^<'+this.datatype+'>');
			} else {
				if (this.lang) {
					str.push('"'+this.object+'"@'+this.lang);
				} else {
					str.push('"'+this.object+'"');
				}
			}
		} else {
			if (this.object && this.object.indexOf('genid')==0) {
				str.push('_:n'+this.object.substr(6)+'');
			} else {
				str.push('<'+this.object+'>');
			}
		}
		str.push(' .\n');
		return str.join('');
	};
