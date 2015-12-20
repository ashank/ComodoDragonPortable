function JPEGEncoderThreaded(a){function b(a,b,d,e,j){var k=new c(i,g,b,d,e);h[g]=k,g++;var m=j?"cache_only":"encode_new";f.postMessage(JSON.stringify({command:m,data:{cacheIndex:k._cachedImageIndex,quality:k.quality,cache:k._cache,width:a.width,height:a.height}}));for(var n=a.data,o=n.length,p=new Array(o/4*3),q=0,r=0;o>r;r+=4)p[q++]=l[n[r]],p[q++]=l[n[r+1]],p[q++]=l[n[r+2]];var s=p.join("");return p=null,f.postMessage(s),s=null,e?k:!0}function c(a,b,c,d,e){var a=a;this._cachedImageIndex=b,this._cache=e,this.quality=c,this.callback=d,this.encode=function(b){b&&(this.quality=b),a._encodeCached(this._cachedImageIndex,this.quality,this.callback)}}var d,e=a||"jpeg_encoder_threaded_worker.js",f=new Worker(e),g=0,h=[],i=this,j="json",k=0,l=function(){for(var a=String.fromCharCode,b=new Array(256),c=0;256>c;c++)b[c]=a(c);return b}();f.onmessage=function(a){var b;if("json"==j)b=JSON.parse(a.data),k=b.cacheIndex,j="datauri";else{b=h[k];var c=(new Date).getTime()-d;console.log("Threaded encoding time: "+c+"ms"),b.callback("data:image/jpeg;base64,"+btoa(a.data)),b._cache||(h[k]=null),j="json"}},this.encode=function(a,c,e,f){return d=(new Date).getTime(),b(a,c,e,f,!1)},this.prepareImage=function(a,c,d){return b(a,c,d,!0,!0)},this._encodeCached=function(a,b){d=(new Date).getTime(),f.postMessage(JSON.stringify({command:"encode_cached",data:{cacheIndex:a,quality:b}}))},this.clearCaches=function(){g=0,h=[],f.postMessage(JSON.stringify({command:"clear_caches"}))}}function getImageDataFromImage(a){var b="string"==typeof a?document.getElementById(a):a,c=document.createElement("canvas");c.width=b.width,c.height=b.height;var d=c.getContext("2d");return d.drawImage(b,0,0),d.getImageData(0,0,c.width,c.height)}