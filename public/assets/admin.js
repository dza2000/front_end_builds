define("admin/adapters/application",["ember-data","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.ActiveModelAdapter.extend({namespace:window.RAILS_ENV.baseURL+(window.RAILS_ENV.baseURL?"/":"")+"api"})}),define("admin/app",["ember","ember/resolver","ember/load-initializers","admin/config/environment","exports"],function(e,t,a,s,n){"use strict";var r=e["default"],p=t["default"],i=a["default"],l=s["default"];r.MODEL_FACTORY_INJECTIONS=!0;var u=r.Application.extend({modulePrefix:l.modulePrefix,podModulePrefix:l.podModulePrefix,Resolver:p});i(u,l.modulePrefix),n["default"]=u}),define("admin/components/app-card-list",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Component.extend({handleCancelNewApp:function(e){e.deleteRecord()}})}),define("admin/components/app-card",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Component.extend({})}),define("admin/components/async-button",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Component.extend({tagName:"button",textState:"default",reset:!1,classNames:["async-button"],classNameBindings:["textState"],attributeBindings:["disabled","type"],type:"submit",disabled:a.computed.equal("textState","pending"),click:function(){var e=this;return this.sendAction("action",function(t){e.set("promise",t)}),this.set("textState","pending"),!1},text:a.computed("textState","default","pending","resolved","fulfilled","rejected",function(){return this.getWithDefault(this.textState,this.get("default"))}),resetObserver:a.observer("textState","reset",function(){this.get("reset")&&["resolved","rejected","fulfilled"].contains(this.get("textState"))&&this.set("textState","default")}),handleActionPromise:a.observer("promise",function(){var e=this;this.get("promise").then(function(){e.isDestroyed||e.set("textState","fulfilled")})["catch"](function(){e.isDestroyed||e.set("textState","rejected")})}),setUnknownProperty:function(e,t){"resolved"===e&&(a.deprecate("The 'resolved' property is deprecated. Please use 'fulfilled'",!1),e="fulfilled"),this[e]=null,this.set(e,t)}})}),define("admin/components/build-list",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Component.extend({orderedBuildsSortingProps:["createdAt:desc"],orderedBuilds:a.computed.sort("builds","orderedBuildsSortingProps")})}),define("admin/components/new-app-card",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Component.extend({didInsertElement:function(){this.$("input").focus()},actions:{createApp:function(){return this.get("app").save()},cancelNewApp:function(){this.get("app").deleteRecord()}}})}),define("admin/controllers/app",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Controller.extend({attrs:{}})}),define("admin/controllers/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Controller.extend({attrs:{}})}),define("admin/helpers/fa-icon",["ember","exports"],function(e,t){"use strict";var a=e["default"],s=/^fa\-.+/,n=a.Logger.warn,r=function(e,t){if("string"!==a.typeOf(e)){var r="fa-icon: no icon specified";return n(r),new a.Handlebars.SafeString(r)}var p=t.hash,i=[],l="";return i.push("fa"),e.match(s)||(e="fa-"+e),i.push(e),p.spin&&i.push("fa-spin"),p.flip&&i.push("fa-flip-"+p.flip),p.rotate&&i.push("fa-rotate-"+p.rotate),p.lg&&(n("fa-icon: the 'lg' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\"lg\"}}"),i.push("fa-lg")),p.x&&(n("fa-icon: the 'x' parameter is deprecated. Use 'size' instead. I.e. {{fa-icon size=\""+p.x+'"}}'),i.push("fa-"+p.x+"x")),p.size&&i.push("number"===a.typeOf(p.size)?"fa-"+p.size+"x":"fa-"+p.size),p.fixedWidth&&i.push("fa-fw"),p.listItem&&i.push("fa-li"),p.pull&&i.push("pull-"+p.pull),p.border&&i.push("fa-border"),p.classNames&&!a.isArray(p.classNames)&&(p.classNames=[p.classNames]),a.isEmpty(p.classNames)||Array.prototype.push.apply(i,p.classNames),l+="<i",l+=" class='"+i.join(" ")+"'",p.title&&(l+=" title='"+p.title+"'"),l+="></i>",new a.Handlebars.SafeString(l)};t.faIcon=r,t["default"]=a.Handlebars.makeBoundHelper(r)}),define("admin/initializers/ember-moment",["ember-moment/helpers/moment","ember-moment/helpers/ago","ember","exports"],function(e,t,a,s){"use strict";var n=e.moment,r=t.ago,p=a["default"],i=function(){p.Handlebars.helper("moment",n),p.Handlebars.helper("ago",r)};s.initialize=i,s["default"]={name:"ember-moment",initialize:i}}),define("admin/initializers/export-application-global",["ember","admin/config/environment","exports"],function(e,t,a){"use strict";function s(e,t){var a=n.String.classify(r.modulePrefix);r.exportApplicationGlobal&&(window[a]=t)}var n=e["default"],r=t["default"];a.initialize=s,a["default"]={name:"export-application-global",initialize:s}}),define("admin/models/app",["ember-data","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Model.extend({name:a.attr("string",{defaultValue:""}),apiKey:a.attr("string"),builds:a.hasMany("build"),bestBuild:function(){return this.get("builds").findBy("isBest")}.property("builds.@each.isBest")})}),define("admin/models/build",["ember-data","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Model.extend({app:a.belongsTo("app"),sha:a.attr("string"),job:a.attr("string"),branch:a.attr("string"),html:a.attr("string"),fetched:a.attr("boolean"),active:a.attr("boolean"),endpoint:a.attr("string"),createdAt:a.attr("date"),isBest:a.attr("boolean"),shortSha:function(){return this.get("sha").slice(0,6)}.property("sha")})}),define("admin/router",["ember","admin/config/environment","exports"],function(e,t,a){"use strict";var s=e["default"],n=t["default"],r=s.Router.extend({location:n.locationType,baseURL:window.RAILS_ENV.baseURL});r.map(function(){this.resource("app",{path:"/:app_id"})}),a["default"]=r}),define("admin/routes/app",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Route.extend({setupController:function(e,t){e.set("attrs.app",t)},actions:{deleteApp:function(){var e=this;return this.get("controller.attrs.app").destroyRecord().then(function(){return e.transitionTo("index")},function(e){console.error("deleteApp didn't work"),console.log(e)})}}})}),define("admin/routes/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Route.extend({model:function(){return this.store.find("app")},setupController:function(e,t){e.set("attrs.apps",t)},actions:{createApp:function(){return this.store.createRecord("app")}}})}),define("admin/serializers/application",["ember-data","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.ActiveModelSerializer.extend({})}),define("admin/templates/app",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push('\n  <div class="panel panel-default">\n    <div class="panel-heading">\n      <h3 class=\'panel-title\'>Current live build</h3>\n    </div>\n    <div class="panel-body">\n      <p>Branch: <strong>'),a=s._triageMustache.call(e,"attrs.app.bestBuild.branch",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</strong></p>\n      <p>Sha: <strong>"),a=s._triageMustache.call(e,"attrs.app.bestBuild.sha",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</strong></p>\n      <p>Job: <strong>"),a=s._triageMustache.call(e,"attrs.app.bestBuild.job",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</strong></p>\n    </div>\n  </div>\n"),n}function i(e,t){var a,n="";return t.buffer.push("\n  <div class=\"text-muted\">\n    <p class='lead'>No active build.</p>\n\n    <p>\n      <small>To push a new active build, POST to\n      <pre>/front-end-builds?app_name="),a=s._triageMustache.call(e,"attrs.app.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("&api_key="),a=s._triageMustache.call(e,"attrs.app.apiKey",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</pre>\n      </small>\n    </p>\n  </div>\n"),n}function l(e,t){var a,n,r="";return t.buffer.push("\n  <h3 class='appDetail-buildListTitle'>All builds</h3>\n  "),t.buffer.push(f((a=s["build-list"]||e&&e["build-list"],n={hash:{builds:"attrs.app.builds"},hashTypes:{builds:"ID"},hashContexts:{builds:e},contexts:[],types:[],data:t},a?a.call(e,n):c.call(e,"build-list",n)))),t.buffer.push("\n"),r}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var u,o,h,d="",c=s.helperMissing,f=this.escapeExpression,b=this;return r.buffer.push('<div class="page-header">\n  <h1>\n    '),r.buffer.push(f((o=s["link-to"]||t&&t["link-to"],h={hash:{"class":"link-subtle"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[t,t],types:["STRING","STRING"],data:r},o?o.call(t,"Apps/","index",h):c.call(t,"link-to","Apps/","index",h)))),u=s._triageMustache.call(t,"attrs.app.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </h1>\n</div>\n\n"),u=s["if"].call(t,"attrs.app.bestBuild",{hash:{},hashTypes:{},hashContexts:{},inverse:b.program(3,i,r),fn:b.program(1,p,r),contexts:[t],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n\n"),u=s["if"].call(t,"attrs.app.builds",{hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(5,l,r),contexts:[t],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push('\n\n<div class="panel panel-danger">\n  <div class="panel-heading">\n    <div class="panel-title">Danger</div>\n  </div>\n  <div class="panel-body">\n    <p>Careful, this is permanent.</p>\n\n    '),r.buffer.push(f((o=s["async-button"]||t&&t["async-button"],h={hash:{action:"deleteApp","class":"btn btn-danger","default":"Delete this app",pending:"Deleting..."},hashTypes:{action:"STRING","class":"STRING","default":"STRING",pending:"STRING"},hashContexts:{action:t,"class":t,"default":t,pending:t},contexts:[],types:[],data:r},o?o.call(t,h):c.call(t,"async-button",h)))),r.buffer.push("\n  </div>\n</div>\n"),d})}),define("admin/templates/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){t.buffer.push("\n        <strong>front_end_builds</strong> admin\n      ")}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var i,l,u,o="",h=this,d=s.helperMissing;return r.buffer.push('<nav class="navbar navbar-inverse" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      '),l=s["link-to"]||t&&t["link-to"],u={hash:{"class":"navbar-brand"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},inverse:h.noop,fn:h.program(1,p,r),contexts:[t],types:["STRING"],data:r},i=l?l.call(t,"index",u):d.call(t,"link-to","index",u),(i||0===i)&&r.buffer.push(i),r.buffer.push('\n    </div>\n  </div>\n</nav>\n\n<div class="container-fluid">\n  '),i=s._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(i||0===i)&&r.buffer.push(i),r.buffer.push("\n</div>\n"),o})}),define("admin/templates/components/app-card-list",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push("\n  "),a=s["if"].call(e,"app.isNew",{hash:{},hashTypes:{},hashContexts:{},inverse:c.program(4,l,t),fn:c.program(2,i,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n"),n}function i(e,t){var a,n,r="";return t.buffer.push("\n    "),t.buffer.push(d((a=s["new-app-card"]||e&&e["new-app-card"],n={hash:{app:"app",onCancelNewApp:"handleCancelNewApp"},hashTypes:{app:"ID",onCancelNewApp:"ID"},hashContexts:{app:e,onCancelNewApp:e},contexts:[],types:[],data:t},a?a.call(e,n):h.call(e,"new-app-card",n)))),t.buffer.push("\n\n  "),r}function l(e,t){var a,n,r="";return t.buffer.push("\n    "),t.buffer.push(d((a=s["app-card"]||e&&e["app-card"],n={hash:{app:"app"},hashTypes:{app:"ID"},hashContexts:{app:e},contexts:[],types:[],data:t},a?a.call(e,n):h.call(e,"app-card",n)))),t.buffer.push("\n\n  "),r}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var u,o="",h=s.helperMissing,d=this.escapeExpression,c=this;return u=s.each.call(t,"app","in","apps",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,p,r),contexts:[t,t,t],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n"),o})}),define("admin/templates/components/app-card",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push('\n        <div class="row">\n          <div class="col-xs-4">\n            <p class=\'appCard-infoLabel\'>Branch</p>\n            <p>'),a=s._triageMustache.call(e,"app.bestBuild.branch",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</p>\n          </div>\n          <div class=\"col-xs-4\">\n            <p class='appCard-infoLabel'>Sha</p>\n            <p>"),a=s._triageMustache.call(e,"app.bestBuild.shortSha",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</p>\n          </div>\n          <div class=\"col-xs-4\">\n            <p class='appCard-infoLabel'>Job</p>\n            <p>"),a=s._triageMustache.call(e,"app.bestBuild.job",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</p>\n          </div>\n        </div>\n\n        <hr class='short-divider'>\n\n        <p class='u-no-margin-bottom'>\n          API key:\n          <span class='appCard-api'>\n            ********\n            <small class='appCard-copyApiButton'>copy</small>\n          </span>\n        </p>\n\n      "),n}function i(e,t){var a,n="";return t.buffer.push("\n\n        <div class=\"text-muted\">\n          <p class='text-center'>No active build.</p>\n          <hr class='short-divider'>\n          <p>\n            <small>To push a new active build, POST to\n            <pre>/front-end-builds?app_name="),a=s._triageMustache.call(e,"app.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("&api_key="),a=s._triageMustache.call(e,"app.apiKey",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</pre>\n            </small>\n          </p>\n        </div>\n\n      "),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var l,u,o,h="",d=s.helperMissing,c=this.escapeExpression,f=this;return r.buffer.push('<div class="col-sm-4">\n  <div class="appCard panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        '),r.buffer.push(c((u=s["link-to"]||t&&t["link-to"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[t,t,t],types:["ID","STRING","ID"],data:r},u?u.call(t,"app.name","app","app",o):d.call(t,"link-to","app.name","app","app",o)))),r.buffer.push('\n      </h3>\n    </div>\n    <div class="panel-body">\n\n      '),l=s["if"].call(t,"app.bestBuild",{hash:{},hashTypes:{},hashContexts:{},inverse:f.program(3,i,r),fn:f.program(1,p,r),contexts:[t],types:["ID"],data:r}),(l||0===l)&&r.buffer.push(l),r.buffer.push("\n\n    </div>\n  </div>\n</div>\n"),h})}),define("admin/templates/components/async-button",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push("\n  "),a=s._triageMustache.call(e,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n"),n}function i(e,t){var a,n="";return t.buffer.push("\n  "),a=s._triageMustache.call(e,"view.text",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n"),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var l,u="",o=this;return l=s["if"].call(t,"template",{hash:{},hashTypes:{},hashContexts:{},inverse:o.program(3,i,r),fn:o.program(1,p,r),contexts:[t],types:["ID"],data:r}),(l||0===l)&&r.buffer.push(l),r.buffer.push("\n"),u})}),define("admin/templates/components/build-list",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n,r,p="";return t.buffer.push("\n      <tr "),t.buffer.push(d(s["bind-attr"].call(e,{hash:{"class":"build.isBest:success :appDetail-buildListItem"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},contexts:[],types:[],data:t}))),t.buffer.push(">\n        <td class='appDetail-buildListItemCell'>\n          #"),a=s._triageMustache.call(e,"build.id",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n          "),a=s["if"].call(e,"build.isBest",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(2,i,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n        </td>\n        <td class='appDetail-buildListItemCell'>\n          <p>"),t.buffer.push(d((n=s.ago||e&&e.ago,r={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t},n?n.call(e,"build.createdAt",r):f.call(e,"ago","build.createdAt",r)))),t.buffer.push("</p>\n        </td>\n        <td class='appDetail-buildListItemCell'>#"),a=s._triageMustache.call(e,"build.shortSha",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</td>\n        <td class='appDetail-buildListItemCell text-right'>\n          "),a=s["if"].call(e,"build.isBest",{hash:{},hashTypes:{},hashContexts:{},inverse:c.program(6,u,t),fn:c.program(4,l,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n        </td>\n      </tr>\n    "),p}function i(e,t){t.buffer.push("\n            <span class='pull-right'>\n              <span class='label label-success'>Live</span>\n            </span>\n          ")}function l(e,t){t.buffer.push('\n            <button class="btn btn-danger btn-xs">Deactivate</button>\n          ')}function u(e,t){t.buffer.push('\n            <button class="btn btn-warning btn-xs">Make live</button>\n          ')}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var o,h="",d=this.escapeExpression,c=this,f=s.helperMissing;return r.buffer.push("<table class='table table-hover appDetail-buildList'>\n  <thead>\n    <tr>\n      <th class='appDetail-buildListItemCell'>ID</th>\n      <th class='appDetail-buildListItemCell'>Built</th>\n      <th class='appDetail-buildListItemCell'>Commit</th>\n      <th class='appDetail-buildListItemCell'></th>\n    </tr>\n  </thead>\n  <tbody>\n    "),o=s.each.call(t,"build","in","orderedBuilds",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,p,r),contexts:[t,t,t],types:["ID","ID","ID"],data:r}),(o||0===o)&&r.buffer.push(o),r.buffer.push("\n  </tbody>\n</table>\n"),h})}),define("admin/templates/components/new-app-card",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,i,l="",u=this.escapeExpression,o=s.helperMissing;return r.buffer.push("<form "),r.buffer.push(u(s.action.call(t,"createApp",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:t},contexts:[t],types:["STRING"],data:r}))),r.buffer.push('>\n  <div class="col-sm-4">\n    <div class="appCard panel panel-primary">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          '),r.buffer.push(u((p=s.input||t&&t.input,i={hash:{value:"app.name","class":"appCard-newInput",placeholder:"Enter an app name"},hashTypes:{value:"ID","class":"STRING",placeholder:"STRING"},hashContexts:{value:t,"class":t,placeholder:t},contexts:[],types:[],data:r},p?p.call(t,i):o.call(t,"input",i)))),r.buffer.push("\n        </h3>\n      </div>\n      <div class='panel-body'>\n        <p class='text-muted'><small>Once your app is created, you'll receive an API key you can use to push out new builds.</small></p>\n\n        "),r.buffer.push(u((p=s["async-button"]||t&&t["async-button"],i={hash:{action:"createApp",type:"submit","class":"btn btn-sm btn-success","default":"Create",pending:"Creating..."},hashTypes:{action:"STRING",type:"STRING","class":"STRING","default":"STRING",pending:"STRING"},hashContexts:{action:t,type:t,"class":t,"default":t,pending:t},contexts:[],types:[],data:r},p?p.call(t,i):o.call(t,"async-button",i)))),r.buffer.push("\n\n        <button "),r.buffer.push(u(s.action.call(t,"cancelNewApp",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r}))),r.buffer.push(" class='btn btn-link btn-default'>\n          "),r.buffer.push(u((p=s["fa-icon"]||t&&t["fa-icon"],i={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r},p?p.call(t,"remove",i):o.call(t,"fa-icon","remove",i)))),r.buffer.push("\n        </button>\n\n      </div>\n    </div>\n  </div>\n</form>\n"),l})}),define("admin/templates/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,i,l="",u=this.escapeExpression,o=s.helperMissing;return r.buffer.push("<div class=\"page-header\">\n  <h1>Apps</h1>\n</div>\n\n<div class='text-right u-margin-bottom'>\n  <button "),r.buffer.push(u(s.action.call(t,"createApp",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r}))),r.buffer.push(' class="btn btn-default btn-sm">\n    '),r.buffer.push(u((p=s["fa-icon"]||t&&t["fa-icon"],i={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r},p?p.call(t,"plus",i):o.call(t,"fa-icon","plus",i)))),r.buffer.push('\n    New app\n  </button>\n</div>\n\n<div class="row">\n  '),r.buffer.push(u((p=s["app-card-list"]||t&&t["app-card-list"],i={hash:{apps:"attrs.apps"},hashTypes:{apps:"ID"},hashContexts:{apps:t},contexts:[],types:[],data:r},p?p.call(t,i):o.call(t,"app-card-list",i)))),r.buffer.push("\n</div>\n"),l})}),define("admin/config/environment",["ember"],function(e){var t="admin";try{var a=t+"/config/environment",s=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(s));return{"default":n}}catch(r){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("admin/tests/test-helper"):require("admin/app")["default"].create({});