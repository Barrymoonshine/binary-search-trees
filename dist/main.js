(()=>{"use strict";const s=t=>{const n=t.length,o=Math.round(n/2),e=t.slice(0,o),c=t.slice(o,n);return n<=1?t:((s,t)=>{const n=[];for(;s.length&&t.length;)s[0]<t[0]?n.push(s.shift()):n.push(t.shift());return[...n,...s,...t]})(s(e),s(c))},t=s([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);console.log(t),console.log((s=>{const t=[];return s.forEach((s=>{t.includes(s)||t.push(s)})),t})(t))})();