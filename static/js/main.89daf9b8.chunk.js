(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{123:function(e,n,t){e.exports=t(323)},128:function(e,n,t){},130:function(e,n,t){},132:function(e,n,t){},323:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(15),o=t.n(l),c=(t(128),t(26)),i=t(27),u=t(30),s=t(28),m=t(31),p=t(325),f=t(327),h=t(326),d=(t(130),t(29)),E=t(121),b=t.n(E),g=t(38),v=t(49),O=t(39),x=(t(132),t(67)),j=t.n(x),y=t(120),N=t.n(y),w=t(113),C=t.n(w),S=t(115),k=t.n(S),D=t(18),A=t.n(D),P=t(114),G=t.n(P),B=t(66),T=t.n(B),F=t(65),I=t.n(F),z=t(116),J=t.n(z),M=t(117),W=t.n(M),R=t(118),U=t.n(R),V=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(u.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(r)))).handleExclusionChange=function(e){return function(n){t.props.onExclusionChange(e,n.target.value)}},t.handlePersonDelete=function(e){return function(n){t.props.onPersonDelete(e)}},t}return Object(m.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.classes,a=n.exclusionOptions,l=n.people;return l.length?r.a.createElement(I.a,{className:t.root},r.a.createElement(C.a,null,r.a.createElement(G.a,null,r.a.createElement(T.a,null,r.a.createElement(A.a,null,"Name"),r.a.createElement(A.a,null,"Don't match with"),r.a.createElement(A.a,null,"Giftee"),r.a.createElement(A.a,{className:t.removeCell},"Remove"))),r.a.createElement(k.a,null,l.map(function(n){var l=n.exclusion||"";return r.a.createElement(T.a,{key:n.name},r.a.createElement(A.a,null,n.name),r.a.createElement(A.a,null,r.a.createElement(J.a,{value:l,onChange:e.handleExclusionChange(n.name),name:"exclusion",className:l?t.exclusionSelect:t.noExclusionSelect},r.a.createElement("option",{className:t.nullOption,value:""},"Select..."),a.filter(function(e){return e!==n.name}).map(function(e){return r.a.createElement("option",{key:e,value:e,children:e})}))),r.a.createElement(A.a,null,n.giftee),r.a.createElement(A.a,{className:t.removeCell},r.a.createElement(W.a,{onClick:e.handlePersonDelete(n.name)},r.a.createElement(U.a,{className:t.removeIcon}))))})))):null}}]),n}(a.PureComponent),X=Object(d.withStyles)(function(e){return{root:{width:"100%",overflowX:"auto",backgroundColor:"#f5f3da"},exclusionSelect:{fontSize:"0.8125rem"},noExclusionSelect:{fontSize:"0.8125rem",color:"rgba(0, 0, 0, 0.5)"},noSelection:{root:{color:"red"}},removeCell:{width:"1px",textAlign:"center"},removeIcon:{color:"#dc5757"}}})(V),$=t(119),q=t.n($),H=2,K=function(e){function n(){var e,t;Object(c.a)(this,n);for(var l=arguments.length,o=new Array(l),i=0;i<l;i++)o[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(o)))).state={name:"",people:[{name:"Uno",giftee:null},{name:"Dos",giftee:null},{name:"Tres",giftee:null},{name:"Cuatro",giftee:null}],exclusions:[]},t.handleNameChange=function(e){t.setState({name:e.target.value})},t.handleSubmit=function(e){e.preventDefault();var n=t.state,a=n.people,r=n.name,l=a.map(function(e){return Object(O.a)({},e,{giftee:null})});t.setState({name:"",people:Object(v.a)(l).concat([{name:t.formatName(r),giftee:null}])})},t.formatName=function(e){return e.trim()},t.isAddDisabled=function(){var e=t.state,n=e.name,a=e.people;if(!n.length)return!0;var r=t.formatName(n);return a.some(function(e){return e.name===r})},t.renderGenerateGiftees=function(){var e=t.state.people.length<H;return r.a.createElement(a.Fragment,null,e?r.a.createElement("p",null,"Add at least ",H," people to be able to generate giftees."):null,r.a.createElement("p",null,r.a.createElement(j.a,{children:"Generate giftees",variant:"contained",color:"primary",disabled:e,type:"submit",onClick:t.generateGiftees})))},t.generateGiftees=function(){var e=t.state.people,n=q()(e),a=Object(v.a)(n.slice(1)).concat([n[0]]),r=e.map(function(e,n){var t=a[n];return Object(O.a)({},e,{giftee:t.name})});t.setState({people:r})},t.handleExclusionChange=function(e,n){var a=t.state.exclusions,r=n?Object(v.a)(a.filter(function(t){return!t.has(e)&&!t.has(n)})).concat([new Set([e,n])]):a.filter(function(t){return!t.has(e)&&!t.has(n)});t.setState({exclusions:r})},t.handlePersonDelete=function(e){var n=t.state,a=n.people,r=n.exclusions;t.setState({people:a.filter(function(n){return n.name!==e}),exclusions:r.filter(function(n){return!n.has(e)})})},t.getExclusionOptions=function(){return t.state.people.map(function(e){return e.name})},t.getExclusionsByName=function(){return t.state.exclusions.reduce(function(e,n){var t,a=Array.from(n);return Object(O.a)({},e,(t={},Object(g.a)(t,a[0],a[1]),Object(g.a)(t,a[1],a[0]),t))},{})},t}return Object(m.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this.state,n=e.name,t=e.people,a=this.getExclusionsByName(),l=t.map(function(e){return Object(O.a)({},e,{exclusion:a[e.name]||null})});return r.a.createElement("div",{className:"PersonForm"},r.a.createElement(X,{people:l,exclusionOptions:this.getExclusionOptions(),onPersonDelete:this.handlePersonDelete,onExclusionChange:this.handleExclusionChange}),r.a.createElement("form",{noValidate:!0,onSubmit:this.handleSubmit},r.a.createElement(N.a,{label:"Name",value:n,onChange:this.handleNameChange,margin:"normal"}),r.a.createElement(j.a,{className:"add-person",children:"Add",variant:"contained",color:"primary",disabled:this.isAddDisabled(),type:"submit"})),this.renderGenerateGiftees())}}]),n}(a.PureComponent),L=Object(d.createMuiTheme)({palette:{primary:{main:"#81c784"},secondary:b.a}}),Q=function(e){function n(){return Object(c.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(m.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(d.MuiThemeProvider,{theme:L},r.a.createElement(p.a,{basename:"/giftibutor"},r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"Giftibutor")),r.a.createElement("main",{className:"App-main"},r.a.createElement(f.a,null,r.a.createElement(h.a,{path:"/",exact:!0,component:K}),r.a.createElement(h.a,{path:"/giftee",exact:!0,component:function(){return r.a.createElement("span",{children:"TODO"})}}),r.a.createElement(h.a,{component:function(){return r.a.createElement("span",{children:"Not Found"})}}))))))}}]),n}(a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[123,2,1]]]);
//# sourceMappingURL=main.89daf9b8.chunk.js.map