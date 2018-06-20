
/* Smart HTML Elements v1.1.0 (2018-June) 
Copyright (c) 2011-2018 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart("smart-file-upload",class extends Smart.BaseElement{static get properties(){return{accept:{value:null,type:"string?"},appendTo:{value:null,type:"any"},autoUpload:{value:!1,type:"boolean"},directory:{value:!1,type:"boolean"},dropZone:{value:null,type:"any"},hideFooter:{value:!1,type:"boolean"},itemTemplate:{value:null,type:"string?"},localization:{value:null,type:"object?",reflectToAttribute:!1},multiple:{value:!1,type:"boolean"},name:{value:"",type:"string"},showProgress:{value:!1,type:"boolean"},uploadUrl:{value:"",type:"string",reflectToAttribute:!1}}}static get listeners(){return{"browseButton.click":"browse","browseInput.change":"_browseInputChangeHandler","selectedFiles.click":"_selectedFilesClickHandler","uploadAllButton.click":"uploadAll","cancelAllButton.click":"cancelAll","dropZone.dragenter":"_dropZoneHandler","dropZone.dragleave":"_dropZoneHandler","dropZone.dragover":"_dropZoneHandler","dropZone.drop":"_dropZoneHandler"}}template(){return`<div id="container">
                    <div id="fileUploadHeader" class ="smart-file-upload-header">
                        <smart-button class ="smart-browse-button" id="browseButton" disabled="[[disabled]]"></smart-button>
                        <input type="file" class ="smart-browse-input" id="browseInput" disabled="[[disabled]]" multiple="[[multiple]]" webkitdirectory="[[directory]]" mozdirectory="[[directory]]" />
                    </div>
                    <div id="fileUploadContainer" class ="smart-file-upload-container">
                        <div id="dropZone" class ="smart-drop-zone"></div>
                        <div id="selectedFiles" class ="smart-selected-files"></div>
                    </div>
                    <div id="fileUploadFooter" class ="smart-file-upload-footer smart-hidden">
                        <smart-button class ="smart-upload-all-button" id="uploadAllButton" disabled="[[disabled]]"></smart-button>
                        <smart-button class ="smart-cancel-all-button" id="cancelAllButton" disabled="[[disabled]]"></smart-button>
                        <smart-button class ="smart-abort-all-button" id="abortAllButton" disabled="[[disabled]]"></smart-button>
                    </div>
                </div>`}propertyChangedHandler(a,b,c){const d=this;super.propertyChangedHandler(a,b,c);"accept"===a?d.$.browseInput.accept=c:"dropZone"===a||"appendTo"===a?d._handleContainers():"localization"===a?d._updateTextValues():"multiple"===a?(d.$.browseButton.disabled=!!(!d.multiple&&0<d._selectedFiles.length||d.disabled),!c&&1<d._selectedFiles.length&&(d._selectedFiles.splice(1),d._renderSelectedFiles())):"itemTemplate"===a?0<d._items.length&&d._renderSelectedFiles():void 0}attached(){super.attached();const a=this;a._handleContainers()}detached(){super.attached();const a=this;a.$.dropZone.closest(a.$.fileUploadContainer)||a.$.fileUploadContainer.insertBefore(a.$.dropZone,a.$.fileUploadContainer.firstChild),a.$.selectedFiles.closest(a.$.fileUploadContainer)||a.$.fileUploadContainer.appendChild(a.$.selectedFiles)}ready(){super.ready();const a=this;a._setInitialVlues(),a._updateTextValues(),a._handleContainers()}browse(){const a=this;a.disabled||!a.multiple&&0<a._selectedFiles.length||a.$.browseInput.click()}cancelAll(){const a=this;if(!(a.disabled||0===a._items.length)){for(let b=a._items.length-1;0<=b;b--)a.cancelFile(a._items[b].index);a.$.browseButton.disabled=!!(!a.multiple&&0<a._selectedFiles.length||a.disabled)}}cancelFile(a){const b=this;if(!("number"!=typeof a||b.disabled||0===b._selectedFiles.length)){const c=b._items.filter(b=>b.index===a)[0],d=b._items.indexOf(c);b.$.selectedFiles.removeChild(c),b._selectedFiles.splice(d,1),b._items.splice(d,1),b.$.fireEvent("uploadEnd",{filename:c.file.name,type:c.file.type,size:c.file.size}),b.$.browseButton.disabled=!!(!b.multiple&&0<b._selectedFiles.length||b.disabled),0===b._selectedFiles.length&&b.$.fileUploadFooter.classList.add("smart-hidden")}}uploadAll(){const a=this;if(!(a.disabled||0===a._items.length))for(let b=a._items.length-1;0<=b;b--)a._items[b].uploading||a.uploadFile(a._items[b].index)}uploadFile(a){const b=this;let c=!1;if("number"!=typeof a||b.disabled||0===b._selectedFiles.length)return;let d=new FormData,e=b._items.filter(b=>b.index===a)[0],f=b.showProgress?e.getElementsByTagName("smart-progress-bar")[0]:null,g=e.file;e.classList.remove("smart-error"),e.classList.remove("smart-abort"),e.classList.add("smart-uploading-start"),d.append("userfile[]",g);let h=new XMLHttpRequest;h.open("POST",b.uploadUrl),b.$.fireEvent("uploadStart",{filename:e.file.name,type:e.file.type,size:e.file.size}),h.upload.onprogress=function(a){c||(c=!0,e.classList.remove("smart-uploading-start"),e.classList.add("smart-uploading"),e.uploading=!0),f&&(f.value=Math.round(100*(a.loaded/a.total))),e.classList.remove("smart-error"),e.classList.remove("smart-abort"),h.abort()},h.onabort=function(){e.classList.remove("smart-uploading-start"),e.classList.remove("smart-uploading"),e.classList.add("smart-abort"),e.addEventListener("animationend",function(){e.classList.remove("smart-abort"),e.classList.remove("smart-error")})},h.onerror=function(){e.classList.remove("smart-uploading-start"),e.classList.remove("smart-uploading"),e.classList.add("smart-error"),e.addEventListener("animationend",function(){e.classList.remove("smart-abort"),e.classList.remove("smart-error")})},h.onload=function(){if(c=!1,e.classList.remove("smart-uploading-start"),e.classList.remove("smart-uploading"),200<=h.status&&299>=h.status){let a=b._items.indexOf(e);b.$.selectedFiles.removeChild(e),b._selectedFiles.splice(b._selectedFiles.indexOf(g),1),b._items.splice(a,1),b.$.browseButton.disabled=!!(!b.multiple&&0<b._selectedFiles.length||b.disabled),b.$.fireEvent("uploadEnd",{filename:e.file.name,type:e.file.type,size:e.file.size,status:h.status}),0===b._selectedFiles.length&&b.$.fileUploadFooter.classList.add("smart-hidden")}else e.classList.add("smart-error"),e.classList.remove("smart-uploading"),b.$.fireEvent("cancel",{filename:e.file.name,type:e.file.type,size:e.file.size,status:h.status})},h.send(d)}_selectedFilesClickHandler(a){const b=this;if(!b.disabled){const c=a.target.closest(".smart-item-upload-button"),d=a.target.closest(".smart-item-cancel-button");if(c){const a=c.closest(".smart-file");b.uploadFile(a.index)}else if(d){const a=d.closest(".smart-file");b.cancelFile(a.index)}}}_dropZoneHandler(a){const b=this;if(a.preventDefault(),a.stopPropagation(),!b.disabled){if("dragenter"===a.type||"dragleave"===a.type)return void("dragenter"===a.type?b.$.dropZone.classList.add("smart-drag-over"):b.$.dropZone.classList.remove("smart-drag-over"));if("drop"===a.type){if(b.$.dropZone.classList.remove("smart-drag-over"),!b.multiple&&0<b._selectedFiles.length)return;if(a.dataTransfer&&a.dataTransfer.files&&a.dataTransfer.files.length){const c=b._filterNewFiles(Array.from(a.dataTransfer.files));if(0===c.length)return;b.multiple||c.splice(1),b._selectedFiles=b._selectedFiles.concat(c),b._renderSelectedFiles(c)}b.$.browseButton.disabled=!!(!b.multiple&&0<b._selectedFiles.length||b.disabled)}}}_defaultItemTemplate(a){const b=this,c=b.localization?b.localization.uploadButton||b._localization.uploadButton:b._localization.uploadButton,d=b.localization?b.localization.cancelButton||b._localization.cancelButton:b._localization.cancelButton,e=b.localization?b.localization.abortButton||b._localization.abortButton:b._localization.abortButton;return`<span class ="smart-item-name">${a}</span>
                <span class ="smart-item-upload-button" title="${c}"></span>
                <span class ="smart-item-cancel-button" title="${d}"></span>
                <span class ="smart-item-abort-button" title="${e}"></span>
                <smart-progress-bar></smart-progress-bar>`}_handleContainers(){const a=this,b=a._validateDOMElement(a.dropZone),c=a._validateDOMElement(a.appendTo);b?b.appendChild(a.$.dropZone):a.$.fileUploadContainer.insertBefore(a.$.dropZone,a.$.fileUploadContainer.firstChild),c?c.appendChild(a.$.selectedFiles):a.$.fileUploadContainer.appendChild(a.$.selectedFiles)}_handleItemTemplate(a){const b=this;let c=b.itemTemplate;if(!("content"in document.createElement("template")))return void b.error(b.localize("htmlTemplateNotSuported",{elementType:b.nodeName.toLowerCase()}));if(!c)return b._defaultItemTemplate(a);if(c=document.getElementById(c),null===c||!("content"in c))return void b.error(b.localize("invalidTemplate",{elementType:b.nodeName.toLowerCase(),property:"template"}));const d=c.innerHTML,e=/{{\w+}}/g;return d.replace(e,a)}_validateDOMElement(a){if(a)return"string"==typeof a?document.getElementById(a):a instanceof HTMLElement?a:void 0}_updateTextValues(){const a=this,b=["browseButton","uploadAllButton","cancelAllButton","abortAllButton"];for(let c,d=0;d<b.length;d++)c=b[d],a.$[c].innerHTML=a.localization?a.localization[c]||a._localization[c]:a._localization[c];for(let b=0;b<a._selectedFiles.length;b++){const c=a._items[b];c.querySelector(".smart-item-upload-button").innerHTML=a.localization?a.localization.uploadButton||a._localization.uploadButton:a._localization.uploadButton,c.querySelector(".smart-item-cancel-button").innerHTML=a.localization?a.localization.cancelButton||a._localization.cancelButton:a._localization.cancelButton}}_browseInputChangeHandler(){const a=this,b=a._filterNewFiles(Array.from(a.$.browseInput.files));a.disabled||0===b.length||(a._selectedFiles=a._selectedFiles.concat(b),a._renderSelectedFiles(b),a.$.browseButton.disabled=!!(!a.multiple&&0<a._selectedFiles.length||a.disabled),a.$.browseInput.value="")}_filterNewFiles(a){const b=this;let c=[];for(let d,e=0;e<a.length;e++){d=!0;for(let c=0;c<b._selectedFiles.length;c++){const f=b._selectedFiles[c],g=a[e];if(g.name===f.name&&g.size===f.size&&g.type===f.type&&g.lastModified===f.lastModified){d=!1;break}}d&&c.push(a[e])}return c}_renderSelectedFiles(a){const b=this,c=document.createDocumentFragment(),d=a||b._selectedFiles,e=b.localization?b.localization.uploadButton||b._localization.uploadButton:b._localization.uploadButton,f=b.localization?b.localization.cancelButton||b._localization.cancelButton:b._localization.cancelButton;a||(b._items=[],b.$.selectedFiles.innerHTML="");for(let e=0;e<d.length;e++){const a=b.directory?d[e].webkitRelativePath:d[e].name,f=document.createElement("div");b._incrementIndex++,f.className="smart-file",f.index=b._incrementIndex,f.innerHTML=b.itemTemplate?b._handleItemTemplate(a):b._defaultItemTemplate(a),f.file=d[e],f.uploading=!1,c.appendChild(f),b._items.push(f),b.$.fireEvent("select",{filename:d[e].name,type:d[e].type,size:d[e].size})}b.$.selectedFiles.appendChild(c),b.$.fileUploadFooter.classList.remove("smart-hidden")}_setInitialVlues(){const a=this;a.$.browseInput.accept=a.accept,a._selectedFiles=[],a._items=[],a._incrementIndex=0,a._localization={browseButton:"Browse",uploadAllButton:"Upload All",cancelAllButton:"Cancel All",abortAllButton:"Abort All",uploadButton:"Upload File",cancelButton:"Cancel File",abortButton:"Cancel Upload"}}});