var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function (window) {
	function AtBashLib() {
		var alefBet = "אבגדהוזחטיכלמנסעפצקרשת";
		var reverseAlefBet = "תשרקצפעסנמלכיטחזוהדגבא";
		// var manzapach = "מםנןצץפףכך";
		var manzapach = {}; // manzapach characters' parallels' indexi
		manzapach["ם"] = alefBet.indexOf("מ");
		manzapach["ן"] = alefBet.indexOf("נ");
		manzapach["ץ"] = alefBet.indexOf("צ");
		manzapach["ף"] = alefBet.indexOf("פ");
		manzapach["ך"] = alefBet.indexOf("כ");

		/*
		return the reverse-order-paralel of this character,
		or the character unchaged if it is not a hebrew letter
		*/
		function reverseChar (c) {
			var ci = alefBet.indexOf(c);
			if (ci < 0) { // not in the alefBet
				if (c in manzapach) { // manzapach character
					ci = manzapach[c];
				} else { // not a hebrew letter
					return c;
				}
			};
			return reverseAlefBet.charAt(ci);
		}

		/*
		returns the at-bash encription of the given text
		*/
		function atBash(txt) {
			var ca = txt.trim().split(""); // char array
			var eca = ca.map(reverseChar); // encripted char array
			return eca.join("");
		}

		/*
		returns the al-bam encription of the text
		*/
		function alBam (txt) {
			var step = alefBet.indexOf('ל') - alefBet.indexOf('א');
			return permutate(txt, step);
		}

		/*
		input: a character in hebrew, and a permutation step
		output: its permutated value
		*/
		function permChar (c, p) {
			var ci = alefBet.indexOf(c); // char index
			if (ci < 0) {
				if (c in manzapach) { // manzapach character
					ci = manzapach[c];
				} else { // not a hebrew letter
					return c;
				}
			};
			var ni = (ci+p) % 22; // new index
			// TODO what about negative permutions?
			return alefBet.charAt(ni);
		}

		/*
		input: a token of text, and a permutation step
		output: the token encripted using the permutation
		*/
		function permToken (t, p) {
			if (t.length == 1) { return permChar(t, p); };
			var ca = t.trim().split(""); // char array
			var pa = []; // permutation array
			for (var i = 0; i < ca.length; i++) {
				var pc = permChar(ca[i], p);
				pa.push(pc);
			};
			return pa.join(""); // join the array into a string
		}
		
		/*
		input: text in hebrew, direction(1, or -1) of permutation and number of steps
		output: the text encripted as specified

		@param txt - text in hebrew
		@param step - the number of steps the permutation has to jump
		@param dir - the direction of the permutation. 1 is forward, -1 is backwards.
		*/
		function permutate (txt, step, dir=1) {
			var p = step*dir;
			var tokens = txt.trim().split(" ")
			for (var i = 0; i < tokens.length; i++) {
				tokens[i] = permToken(tokens[i], p);
			};
			return tokens.join(" ");
		}

		/////////////////
		// constructor //
		/////////////////
		this.atBash = atBash;
		this.alBam = alBam;
	}

	// create the library
	window.AtBashLib = new AtBashLib();
}(window));

}
