(this["webpackJsonpclient-react-project"]=this["webpackJsonpclient-react-project"]||[]).push([[0],{115:function(e,t){},119:function(e,t,n){},121:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),c=n(22),l=n.n(c),u=(n(80),n(6)),s=n(24);n(81);var i=function(){return r.a.createElement("div",null,r.a.createElement("p",null," Miroslav greets the world from REACT - with hot reloading upon any change (even unsaved) XX."),r.a.createElement("h2",null,"This is page 1 - HOME page."))},m=n(7),p=n(11),h=n(38);function d(){var e=Object(u.a)(["\nwidth:200px;\nmax-width:25%;\nmargin: 10px;\nbackground: linear-gradient(  rgba(0,0,0,0),white);\n/* background-color:white; */\n"]);return d=function(){return e},e}function f(){var e=Object(u.a)(["\nmargin:10px 40px;\ntext-align: center;\nbackground-color: lightgrey;\n@media(max-width: 400px) { \n  margin:3px;\n}\n"]);return f=function(){return e},e}var g=m.a.div(f()),E=m.a.img(d()),v=function(e){return r.a.createElement(E,{src:e.imageUrl,alt:""})},b=Object(h.b)((function(e){return r.a.createElement(v,{imageUrl:e.imageUrl})})),y=Object(h.a)((function(e){return r.a.createElement("div",null,e.imagesUrls.map((function(e,t){return r.a.createElement(b,{key:e,index:t,imageUrl:e})})))})),x=function(){var e=Object(a.useState)(function(e){for(var t=[],n=1;n<=e;n++)t.push("https://robohash.org/".concat(n));return t}(10)),t=Object(p.a)(e,2),n=t[0],o=t[1];return r.a.createElement(g,null,r.a.createElement("h2",null,"Sortable gallery"),r.a.createElement(y,{imagesUrls:n,onSortEnd:function(e){var t=e.oldIndex,a=e.newIndex;console.log("on sort end fired");var r=Object(h.c)(n,t,a);o(r)},axis:"xy"}))};function k(){var e=Object(u.a)(["\ntext-align: center;\n"]);return k=function(){return e},e}var S=m.a.div(k());var j=function(){return r.a.createElement(S,null,r.a.createElement("h1",null,"My React Playground"),r.a.createElement(x,null))};var w=function(){var e=Object(a.useState)(null),t=Object(p.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),l=Object(p.a)(c,2),u=l[0],s=l[1],i=Object(a.useState)([]),m=Object(p.a)(i,2),h=m[0],d=m[1];return Object(a.useEffect)((function(){fetch("https://dog.ceo/api/breeds/image/random").then((function(e){return e.json()})).then((function(e){s(!0),d(e.message)}),(function(e){s(!0),o(e)}))}),[]),n?r.a.createElement("div",null,"Error: ",n.message):u?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,h)):r.a.createElement("div",null,"Loading...")},O=function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Dogs API (CORS: yes)"),r.a.createElement(w,null))},C=n(17),T=n(18),R=n(21),A=n(20);function P(){var e=Object(u.a)(["\ncolor: blue;\nfont-style:italic;\nfont-size:0.8rem;\n\n"]);return P=function(){return e},e}var D=m.a.p(P()),z=function(e){Object(R.a)(n,e);var t=Object(A.a)(n);function n(e){var a;return Object(C.a)(this,n),(a=t.call(this,e)).state={error:null,isLoaded:!1,data:[]},a}return Object(T.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch(this.props.url).then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,data:t})}),(function(t){e.setState({isLoaded:!0,error:t}),t&&console.log("Error second in fetch:",t)}))}},{key:"render",value:function(e){var t=this.state.data,n=0;return r.a.createElement("div",null,r.a.createElement("h3",null,this.props.title),r.a.createElement(D,null,' getting from url: "',this.props.url,'"'),r.a.createElement("div",{style:{backgroundColor:"red",margin:"10px"}},r.a.createElement("h5",null," Data received->"),"object"==typeof t?Object.entries(t).map((function(e){return n++,r.a.createElement("div",{key:n}," ",r.a.createElement("span",{style:{color:"blue"}}," ",e[0]," ")," : ",JSON.stringify(e[1]))})):r.a.createElement("p",null,t)))}}]),n}(r.a.Component),H="",I="";function L(){var e=Object(u.a)(["\n>*{\nbackground-color: lightgreen;\nmin-height:100px;\nmin-width:300px;\nmargin:10px;\n}\n"]);return L=function(){return e},e}H="https://mern-express-heroku.herokuapp.com/api",I="https://mern-express-heroku.herokuapp.com",console.log(H);var M=m.a.div(L());var N=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"This is API page."),r.a.createElement(M,null,r.a.createElement(O,null),r.a.createElement(z,{url:H+"/json",title:"test of simple local API from Express"}),r.a.createElement(z,{url:H+"/json/cats",title:"cats from Remote API using CORS"})))},U=n(3),B=n.n(U),F=n(5),J=function(){var e=Object(F.a)(B.a.mark((function e(t,n,a){var r,o;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=function(){return(o=Object(F.a)(B.a.mark((function e(t,n){var a,r;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},e.next=3,fetch(t,a);case 3:return r=e.sent,console.log("1.Fetch res in translate:",r),e.next=7,r.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)},r=function(e,t){return o.apply(this,arguments)},e.next=4,r("".concat(H,"/translate"),{from:t,to:n,translate:a}).then((function(e){return console.log("Data from server: ",e),e}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}();n(86);function q(){var e=Object(u.a)(["\ndisplay: inline-block;\n/* display: flex; align-items: center;justify-content: center; margin:auto; */\nbackground-color: yellowgreen;\npadding: 10px 20px;\n"]);return q=function(){return e},e}var W=m.a.p(q()),K=function(e){Object(R.a)(n,e);var t=Object(A.a)(n);function n(){var e;return Object(C.a)(this,n),(e=t.call(this)).inputChangeHandler=function(){var t=Object(F.a)(B.a.mark((function t(n){return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({textToTranslate:n.target.value}),e.setState({submitted:!1});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleSubmit=function(){var t=Object(F.a)(B.a.mark((function t(n){var a;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.setState({submitted:!0}),t.next=4,J("en","cs",e.state.textToTranslate);case 4:a=t.sent,e.setState({TextTranslated:a.translated});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleSubmit2=function(){var t=Object(F.a)(B.a.mark((function t(n){var a;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.setState({submitted:!0}),t.next=4,J("cs","en",e.state.textToTranslate);case 4:a=t.sent,e.setState({TextTranslated:a.translated});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.checkCzechHighlight=function(e){var t=function(){var e=Object(F.a)(B.a.mark((function e(t,n){var a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=document.createElement("p")).innerHTML=t,a.id="alertForSec",a.style.animationDuration=n+"s",document.querySelector("#translateForms").append(a),e.next=8,new Promise((function(e){return setTimeout(e,1e3*n)}));case 8:document.querySelector("#alertForSec").remove();case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function n(e){var t="";return window.getSelection?(console.log("text received"),t=window.getSelection().toString()):document.selection&&"Control"!==document.selection.type?(console.log("control received"),t=document.selection.createRange().text):(console.log("screwed"),alert("no")),t}console.log(n()),t(n(),1)},e.state={textToTranslate:"",submitted:!1,TextTranslated:null},e}return Object(T.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Translate page"),r.a.createElement("div",{id:"translateForms"},r.a.createElement("form",{id:"translate-form-1",onSubmit:this.handleSubmit},r.a.createElement("h4",null,"From ENGLISH to CZECH:"),r.a.createElement("input",{type:"text",placeholder:"English text...",onChange:this.inputChangeHandler}),r.a.createElement("button",{type:"submit"},"Submit")),r.a.createElement("form",{id:"translate-form-1",onSubmit:this.handleSubmit2},r.a.createElement("h4",null,"From CZECH to ENGLISH:"),r.a.createElement("input",{type:"text",placeholder:"English text...",onChange:this.inputChangeHandler}),r.a.createElement("button",{type:"submit"},"Submit")),"string"==typeof this.state.TextTranslated&&r.a.createElement(W,null,this.state.TextTranslated)),r.a.createElement("div",null,r.a.createElement("p",{className:"textToHighlight",onTouchEnd:this.checkCzechHighlight},"\u0160v\xfdcarsko, mezi \u010cechy v\u011bt\u0161inou zn\xe1m\xe9 preciznost\xed a vysokou \xfarovn\xed infrastruktury, si p\u0159i zvl\xe1d\xe1n\xed epidemie koronaviru nevede zrovna nejl\xe9pe. V zemi s v\xedce ne\u017e 27 tis\xedci naka\u017een\xfdmi a tis\xedci mrtv\xfdmi dosud neplat\xed povinn\xe9 no\u0161en\xed rou\u0161ek, a to ani pro zam\u011bstnance obchod\u016f. Kdy\u017e jdete ven se zakryt\xfdm obli\u010dejem, lid\xe9 na v\xe1s koukaj\xed jako na malomocn\xe9ho, shoduj\xed se \u010ce\u0161i \u017eij\xedc\xed v zemi. Zdroj: https://www.idnes.cz/zpravy/zahranicni/koronavirus-covid-19-svycarsko-nakazeni-nemocni-opatreni.A200417_112621_zahranicni_vlc"),r.a.createElement("button",{onClick:this.checkCzechHighlight},"Click me now"),r.a.createElement("p",{onTouchEndCapture:this.checkCzechHighlight},"TouchEndCapture Another is for staff to reuse"),r.a.createElement("p",{onTouchCancel:this.checkCzechHighlight},"TouchCancel Another is for staff to reuse"),r.a.createElement("p",{onTouchCancelCapture:this.checkCzechHighlight}," TouchCancelCapture Another is for staff to reuse"),r.a.createElement("p",{onTouchMove:this.checkCzechHighlight},"TouchMove Another is for staff to reuse"),r.a.createElement("p",{onTouchMoveCapture:this.checkCzechHighlight},"TouchMoveCapture Another is for staff to reuse"),r.a.createElement("p",{onTouchStart:this.checkCzechHighlight},"TouchStart Another is for staff to reuse"),r.a.createElement("p",{onTouchStartCapture:this.checkCzechHighlight},"TouchStartCapture Another is for staff to reuse")))}}]),n}(a.Component),G=n(68),X=n.n(G);function _(){var e=Object(u.a)(["\np{padding: 0;margin: 0;}\nspan{color:blue;}\n"]);return _=function(){return e},e}var V=m.a.div(_()),Y=function(e){Object(R.a)(n,e);var t=Object(A.a)(n);function n(){var e;return Object(C.a)(this,n),(e=t.call(this)).handleButtonClick=function(t){console.log("click"),e.setState((function(e){return{counter:e.counter+1}}),(function(){console.log("click - counter after update:",e.state.counter),e.state.socket.emit("fromReactDBAddTank3",{name:"xuu".concat(e.state.counter),size:77})}))},e.state={socket:X()(I),defaultState:"ahoj",fromExpress:{},socketState:"off",mongoDBconnection:"off",mongoDBActionResult:"no action taken yet",counter:10,cookies:document.cookie},e}return Object(T.a)(n,[{key:"componentDidMount",value:function(){var e=this;console.log("my cookies on front end:"),console.log(document.cookie),fetch("".concat(H,"/user/checkJWTCookie"),{credentials:"include"}).then((function(e){return e.json()})).then((function(t){console.log("FETCH success - RESULT:",t),e.setState({fetchResults:t})}),(function(t){console.log("Error second in fetch:",t),e.setState({fetchResults:t})})),this.state.socket.on("socketState",(function(t){e.setState({socketState:t})})),this.state.socket.on("mongoDBState",(function(t){e.setState({mongoDBconnection:t})})),this.state.socket.on("mongoDBErr",(function(t){e.setState({mongoDBActionResult:t})})),this.state.socket.on("fromExpress",(function(t){e.setState({fromExpress:t})}))}},{key:"render",value:function(){return r.a.createElement(V,null,r.a.createElement("p",null,"urlRoot: ",I),r.a.createElement("p",null,"Socket state: ",r.a.createElement("span",{style:{color:"green",backgroundColor:"yellow"}},this.state.socketState)),r.a.createElement("h1",null,"MongoDB page"),r.a.createElement("p",{style:{marginRight:"20px",border:"1px dotted black",display:"inline"}},"connection: ",r.a.createElement("span",{style:{color:"green",backgroundColor:"yellow",fontWeight:"bold"}},this.state.mongoDBconnection)),r.a.createElement("p",{style:{display:"inline",fontSize:"10px"}},"proof from Express: ",r.a.createElement("span",null,JSON.stringify(this.state.fromExpress))),r.a.createElement("br",null),r.a.createElement("p",null," Mongo Action result: ",r.a.createElement("span",null,JSON.stringify(this.state.mongoDBActionResult))),r.a.createElement("button",{style:{backgroundColor:"lightblue"},onClick:this.handleButtonClick},"button"),r.a.createElement("h3",null,"current cookies"),r.a.createElement("p",null,this.state.cookies))}}]),n}(a.Component),Z={user:null,info:"Pushups context",reRender:0,updateUser:function(e){this.user=e,console.log("context updated to ",this),this.reRender+=1}},$=Object(a.createContext)(Z),Q=function(){var e=Object(F.a)(B.a.mark((function e(){var t,n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(H,"/user/checkJWTCookie"),{credentials:"include"});case 3:return t=e.sent,e.next=6,t.json();case 6:if(!(n=e.sent).user){e.next=11;break}return e.abrupt("return",n.user);case 11:return e.abrupt("return",n.guest);case 12:e.next=17;break;case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",{email:"error",data:e.t0});case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}();function ee(e,t){return te.apply(this,arguments)}function te(){return(te=Object(F.a)(B.a.mark((function e(t,n){var a,r,o,c;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=H+"/pushups"+t,e.prev=1,o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"},e.next=5,fetch(a,o);case 5:return c=e.sent,e.next=8,c.json();case 8:r=e.sent,e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log("!!!err in receiving json data back from POSTJson request",e.t0),r=e.t0;case 15:return e.abrupt("return",r);case 16:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function ne(){return(ne=Object(F.a)(B.a.mark((function e(t,n){var a,r,o;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"},e.next=4,fetch(t,r);case 4:return o=e.sent,e.next=7,o.json();case 7:a=e.sent,e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("!!!err in receiving json data back from POSTJson request",e.t0),a=e.t0;case 14:return e.abrupt("return",a);case 15:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}var ae=function(e,t){return ne.apply(this,arguments)},re=Object(s.f)((function(e){var t=e.history,n=r.a.useContext($),a=function(){var e=Object(F.a)(B.a.mark((function e(a){var r,o,c;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),r={email:a.target.email.value,password:a.target.password.value},o="".concat(H,"/user/signup"),e.next=5,ae(o,r);case 5:c=e.sent,console.log("server returned:",c),document.querySelector("#signUpResult").innerHTML="RESULT: "+c.message,c.success&&(n.updateUser(c.data.newUser),t.push("/pushups"));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h3",null," Sign up"),r.a.createElement("form",{onSubmit:a},r.a.createElement("p",null,"email:"),r.a.createElement("input",{id:"email"}),r.a.createElement("p",null,"password:"),r.a.createElement("input",{id:"password"}),r.a.createElement("button",{id:"submitSignUpForm",type:"submit"},"Submit"),r.a.createElement("p",{id:"signUpResult"})))})),oe=Object(s.f)((function(e){var t=e.history,n=Object(a.useContext)($),o=function(){var e=Object(F.a)(B.a.mark((function e(a){var r,o,c;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),r={email:a.target.email2.value,password:a.target.password2.value},o="".concat(H,"/user/logInWithEmailAndPassword"),e.next=5,ae(o,r);case 5:c=e.sent,n.updateUser(c),document.querySelector("#LogInResult2")&&(document.querySelector("#LogInResult2").innerHTML="RESULT: "+c.message),c.success&&(document.querySelector("#email2").value="",document.querySelector("#password2").value="",t.push("/pushups"));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h3",null," Log-in"),r.a.createElement("form",{onSubmit:o},r.a.createElement("p",null,"email:"),r.a.createElement("input",{type:"email",id:"email2",defaultValue:"miroslav.makarov@gmail.com"}),r.a.createElement("p",null,"password:"),r.a.createElement("input",{id:"password2",type:"password"}),r.a.createElement("button",{id:"submitLogInWithEmailForm",type:"submit"},"Submit"),r.a.createElement("p",{id:"LogInResult2"})))})),ce=n(125),le=n(124);function ue(){var e=Object(u.a)(["\n/* background:red; */\n/* padding:30px !important; */\nbackground-color: rgba(233, 154, 7, 0.62);\nmargin: 0 5px 8px 5px;\n"]);return ue=function(){return e},e}var se=Object(m.a)(ce.a.Body)(ue()),ie=function(e){e.setUser;return r.a.createElement("div",{style:{clear:"left"}},r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h5",null,"You will be automatically remembered on this device for automatic log-ins in the future. "),r.a.createElement("br",null),r.a.createElement("h5",null," If you don't want that, log-out when you finish. ")),r.a.createElement(le.a,{className:"p-3"},r.a.createElement(ce.a,null,r.a.createElement(le.a.Toggle,{as:ce.a.Header,eventKey:"0",className:"p-3 mb-2 bg-info text-white text-center btnOpacity"},"Sign-up"),r.a.createElement(le.a.Collapse,{eventKey:"0"},r.a.createElement(se,null,r.a.createElement(re,null)))),r.a.createElement(ce.a,null,r.a.createElement(le.a.Toggle,{as:ce.a.Header,eventKey:"1",className:"p-3 mb-2 bg-info text-white MMpointer  text-center btnOpacity"},"Log-in"),r.a.createElement(le.a.Collapse,{eventKey:"1"},r.a.createElement(se,null,r.a.createElement(oe,null))))))},me=n(122),pe=Object(s.f)((function(e){var t=e.history,n=Object(a.useContext)($);console.log("USER CONTEXT in user status:",n.user);var o=null;n.user&&n.user.email&&(o=n.user),Object(a.useEffect)((function(){var e=function(){var e=Object(F.a)(B.a.mark((function e(){var t;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q();case 2:return t=e.sent,console.log("CCCCCchecked With Cookie - Response:",t),n.updateUser(t),e.abrupt("return",(function(){console.log("dismounting??: ",o)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();console.log("effect running..."),console.log("ahojahojahojahojahojahojahojahoj"),e()}),[]);var c=function(){var e=Object(F.a)(B.a.mark((function e(){var a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae("".concat(H,"/user/logOut"),{});case 2:return e.sent,e.next=5,Q();case 5:a=e.sent,n.updateUser(a),t.push("/pushups");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("p",null,"XX: ",o&&o.email),r.a.createElement("p",{style:{textAlign:"right",paddingRight:"5px"}},"user:",o&&o.email?r.a.createElement("span",{style:{color:"green"}}," ",o.email," ",r.a.createElement(me.a,{onClick:c},"Log-out")," "):r.a.createElement("span",{style:{color:"red"}},'"Guest"'),(!o||!o.email)&&r.a.createElement(He,{to:"/pushups/Sign-upLog-in"}," Sign-up / Log-in ")))}));function he(){var e=Object(u.a)(["\nbackground-color: orange;\npadding:2rem;\n/* margin:2rem; */\n\nbutton{\n  /* background-color: red; */\n}\n\n"]);return he=function(){return e},e}var de=m.a.div(he()),fe=function(e){return r.a.createElement(de,null,e.children)},ge=function(){var e=Object(a.useContext)($),t=function(){var t=Object(F.a)(B.a.mark((function t(n,a){var r;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ee("/commit",{userID:e.user._id,planID:n,name:a});case 2:r=t.sent,console.log(r);case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),n=function(){var e=Object(F.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee("/endPlan",{});case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h2",null,"Training Plans"),r.a.createElement(fe,null,r.a.createElement("h3",null,"3-Days split"),r.a.createElement("p",null,"about the training"),r.a.createElement("br",null),r.a.createElement("p",null,"Commit to this training for 2 weeks.",r.a.createElement("button",{id:"trainingPlanID_001",className:"btnOpacity",onClick:function(){return t(12,"3 days split - 5x Max reps")}}," Commit"))),r.a.createElement("div",null,r.a.createElement("p",null," End current training plan."),r.a.createElement("button",{onClick:n},"Finish")))},Ee=(n(119),function(e){var t=r.a.useContext($);return console.log("TTTTTTTTTTTT",t.user),r.a.createElement("div",null,r.a.createElement("h1",null,"Training"),t.user?t.user.pushupPlans.current?t.user.pushupPlans.current.dateStarted?r.a.createElement("p",null,"let the training beginn"):r.a.createElement("p",null,"We need to sort your initial assessment. you can use your previous assessments from recent days. today will be marked as your starting day of your selected training plan."):r.a.createElement("p",null,"select a plan first."):r.a.createElement("p",null,"you are guest"))});function ve(){var e=Object(u.a)(["\ndisplay: block;\nfont-size:2rem;\nmargin:10px;\nbackground-color:orange;\npadding: 3px;\nborder-radius:3px;\ntext-decoration:none;\ntext-align: center;\n&:hover{ \n  background-color:#996b15;\n  color:white;\n  text-decoration:none;\n  /* font-size:20px; */\n}\n/* transition: background-color, color; */\ntransition-duration: 0.25s;\n"]);return ve=function(){return e},e}var be=Object(m.a)(o.c)(ve()),ye=function(e){return r.a.createElement("div",null,r.a.createElement("h1",null,"Push-ups - logo,img,styled intro screen..."),r.a.createElement(be,{to:"/pushups/maxRepsTest"},"Test Your Max Reps"),r.a.createElement(be,{to:"/pushups/trainingPlans"},"Training Plans"),r.a.createElement(be,{to:"/pushups/startMyTraining"},"Start Training"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(be,{to:"/pushups/userProfile"},"My profile (Stats, Settings)"))},xe=function(){var e=r.a.useContext($);console.log("CCC",e);var t=function(){var t=Object(F.a)(B.a.mark((function t(n){var a,r,o;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),a={reps:n.target.assessmentReps.value,notes:n.target.assessmentNotes.value},r="".concat(H,"/pushups/saveNewAssessment"),t.next=5,ae(r,a);case 5:o=t.sent,e.updateUser(o),console.log("server's response to PostJsonData: (updating context now)",o);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h3",null," Results"),r.a.createElement("form",{onSubmit:t},r.a.createElement("p",null,"Reps:"),r.a.createElement("input",{id:"assessmentReps"}),r.a.createElement("p",null,"Notes (changes in assessment execution):"),r.a.createElement("textarea",{id:"assessmentNotes"}),r.a.createElement("button",{id:"submitAssessmentForm",type:"submit"},"Submit")))},ke=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Test Your Max Reps"),r.a.createElement("p",null,"Do as many push-ups as you can."),r.a.createElement("div",{style:{backgroundColor:"lightgray"}},r.a.createElement("h3",null,"Rules - important!"),r.a.createElement("ul",null,r.a.createElement("li",null,"Be FRESH: If you did any arm/chest workout today, do this test tomorrow or day after tomorrow."),r.a.createElement("br",null),r.a.createElement("li",null,'Keep the PALMS "shoulder-width" apart, little bit wider and closer to hips - not parallel with shoulders.'),r.a.createElement("li",null,"ELBOWS/arms should make 45 degrees angle with the torso of your body each time you go down."),r.a.createElement("li",null,"use FULL RANGE of the movement: Chest has to touch floor each time and elbows have to be locked each time."),r.a.createElement("li",null,"KEEP MOVING: Once you start, you can't stop moving. How fast you do the reps, is up to you, you can also change the pace throughout, but you can't stop to rest, even in push-up position, even for 1 second. Once you can't move anymore, stop. "),r.a.createElement("br",null),r.a.createElement("li",null,"take NOTES: If you do any changes to the way you will assess yourself, note it down. Next time you will be assessing yourself, use the same style. (Different styles lead to different rep results and therefore it would be impossible to know, if you actually improved thank to the training, or not.) It is important to try to keep assessment conditions and consistent as possible, for assessment to be valid. "))),r.a.createElement(xe,null))},Se=function(){return r.a.createElement("div",null,"your current max reps: 0 :-)")},je=Object(s.f)((function(e){var t=e.location.pathname;return r.a.createElement(r.a.Fragment,null,"/pushups"==t?null:r.a.createElement(He,{style:{float:"left"},to:"/pushups"},"Pushu-ups Home"),r.a.createElement(pe,null),r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/pushups",component:ye}),r.a.createElement(s.a,{exact:!0,path:"/pushups/trainingPlans",component:ge}),r.a.createElement(s.a,{exact:!0,path:"/pushups/maxRepsTest",component:ke}),r.a.createElement(s.a,{exact:!0,path:"/pushups/startMyTraining",component:Ee}),r.a.createElement(s.a,{exact:!0,path:"/pushups/userProfile",component:Se}),r.a.createElement(s.a,{exact:!0,path:"/pushups/Sign-upLog-in",component:ie})))})),we=function(e){Object(R.a)(n,e);var t=Object(A.a)(n);function n(){var e;return Object(C.a)(this,n),(e=t.call(this)).state={user:null,info:"Pushups context",reRender:0,updateUser:function(t){e.setState({user:t},(function(){console.log("context updated to ",e.state)}))},runReRender:function(t){e.setState({reRender:t},(function(){console.log("context RERENDER updated by",t," to ",e.state.reRender)}))}},e}return Object(T.a)(n,[{key:"render",value:function(){return r.a.createElement($.Provider,{value:this.state},r.a.createElement(je,null))}}]),n}(a.Component),Oe=function(){var e=Object(a.useState)({counter:0}),t=Object(p.a)(e,2),n=t[0],o=t[1];return r.a.createElement("div",null,r.a.createElement("h3",null,"UseState component:"),r.a.createElement("button",{onClick:function(){o({counter:n.counter+1})}}," Add 1 "),r.a.createElement("p",null,"counter: ",r.a.createElement("span",null,n.counter)))},Ce=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Components with states"),r.a.createElement(Oe,null))},Te=(n(120),n(32),n(26)),Re="mirostitchformernproject-ijfme";Te.c.hasAppClient(Re)?Te.c.getAppClient(Re):Te.c.initializeAppClient(Re);r.a.createContext();var Ae=function(e){Object(R.a)(n,e);var t=Object(A.a)(n);function n(){var e;Object(C.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).changeServerStateSubClassTo=function(e){document.querySelectorAll(".".concat("serverState")).forEach((function(t){return t.setAttribute("class","".concat("serverState"," ").concat("serverState").concat(e))}))},e}return Object(T.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.changeServerStateSubClassTo("Activating"),fetch(this.props.url).then((function(e){return e.json()})).then((function(t){e.changeServerStateSubClassTo("On")}),(function(t){console.log("Error in fetch:",t),e.changeServerStateSubClassTo("Err")}))}},{key:"render",value:function(e){return r.a.createElement("style",null,"\n      .serverState{font-weight:bold;}\n      .serverStateOn{color:green;}\n      .serverStateActivating{color:yellow;}\n      .serverStateOff{color:grey;}\n      .serverStateErr{color:red;}\n    ")}}]),n}(r.a.Component);function Pe(){var e=Object(u.a)(["\nmargin:10px;\nbackground-color:orange;\npadding: 3px;\nborder-radius:3px;\ntext-decoration:none;\ntext-align: center;\n&:hover{ \n  background-color:#996b15;\n  color:white;\n  text-decoration:none;\n  /* font-size:20px; */\n}\n/* transition: background-color, color; */\ntransition-duration: 0.25s;\n"]);return Pe=function(){return e},e}function De(){var e=Object(u.a)(["\ndisplay: flex;\nflex-wrap:wrap;\njustify-content: center;\n\nalign-items: center;\nbackground-color: yellow;\n/* overflow:auto; */\n"]);return De=function(){return e},e}var ze=m.a.div(De()),He=Object(m.a)(o.c)(Pe());var Ie=function(){return r.a.createElement(o.b,{basename:"/",className:"App"},r.a.createElement(ze,null,r.a.createElement(He,{to:"/"},"Home"),r.a.createElement(He,{to:"/pageAPI"},"Public API"),r.a.createElement(He,{to:"/pageTr"},"Translate API"),r.a.createElement(He,{to:"/playground"},"Playground"),r.a.createElement(He,{to:"/mongoDB"},"Mongo DB"),r.a.createElement(He,{to:"/states"},"states-useless"),r.a.createElement(He,{to:"/pushups"},"Pushups"),r.a.createElement(Ae,{url:H+"/start"}),r.a.createElement("span",{style:{textAlign:"center",fontSize:"11px",border:"3px dotted gray"}},r.a.createElement("div",{className:"serverState"}," Server-State"),r.a.createElement("span",null,"Environment:")," ",r.a.createElement("span",{style:{color:"red"}}," ","production"))),r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:i}),r.a.createElement(s.a,{exact:!0,path:"/playground",component:j}),r.a.createElement(s.a,{exact:!0,path:"/pageAPI",component:N}),r.a.createElement(s.a,{exact:!0,path:"/pageTr",component:K}),r.a.createElement(s.a,{exact:!0,path:"/mongoDB",component:Y}),r.a.createElement(s.a,{exact:!0,path:"/states",component:Ce}),r.a.createElement(s.a,{path:"/pushups",component:we})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(o.a,null,r.a.createElement(Ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},75:function(e,t,n){e.exports=n(121)},80:function(e,t,n){},81:function(e,t,n){},86:function(e,t,n){}},[[75,1,2]]]);
//# sourceMappingURL=main.2e744b1f.chunk.js.map