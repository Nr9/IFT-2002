/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for MathJax.
 *
 * @author Hakim El Hattab
 */
var RevealMath = window.RevealMath || (function(){

	var options = Reveal.getConfig().math || {};
	options.mathjax = options.mathjax || 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';
	options.config = options.config || 'TeX-AMS_HTML-full';

	loadScript( options.mathjax + '?config=' + options.config, function() {

		MathJax.Hub.Config({
			messageStyle: 'none',
			tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
			skipStartupTypeset: true,
			TeX: {
				Macros: {
			    	rrinc: ['{\\mathtt{inc}(#1)}', 1],
			    	rrset: ['{#1 \\leftarrow #2}', 2],
			    	rrmacro: ['{\\mathtt{#1}(#2)}', 2],
			    	rrrep: ['\\mathtt{répéter}~#1~\\mathtt{fois}~', 1],
			    	rrwhile: ['\\mathtt{tant~que}~#1~\\mathtt{faire}~', 1],
			    	rrif: ['\\mathtt{si}~#1~\\mathtt{alors}~', 1],
			    	rrinvoke: ['{#1 \\leftarrow \\rrmacro{#2}{#3}}', 3],
			    	rrtrue: ['{\\mathtt{vrai}}', 0],
			    	rrfalse: ['{\\mathtt{faux}}', 0],
			  	}
			}
		});

		// Typeset followed by an immediate reveal.js layout since
		// the typesetting process could affect slide height
		MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub ] );
		MathJax.Hub.Queue( Reveal.layout );

		// Reprocess equations in slides when they turn visible
		Reveal.addEventListener( 'slidechanged', function( event ) {

			MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, event.currentSlide ] );

		} );

	} );

	function loadScript( url, callback ) {

		var head = document.querySelector( 'head' );
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		script.onload = finish;

		// IE
		script.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( script );

	}

})();
