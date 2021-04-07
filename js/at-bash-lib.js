export default class AtBashLib {
	constructor(text) {
		this.text = text;
		const alefBet = 'אבגדהוזחטיכלמנסעפצקרשת';
		const reverseAlefBet = 'תשרקצפעסנמלכיטחזוהדגבא';
		// Var manzapach = "מםנןצץפףכך";
		const manzapach = {}; // Manzapach characters' parallels' indexi
		manzapach['ם'] = alefBet.indexOf('מ');
		manzapach['ן'] = alefBet.indexOf('נ');
		manzapach['ץ'] = alefBet.indexOf('צ');
		manzapach['ף'] = alefBet.indexOf('פ');
		manzapach['ך'] = alefBet.indexOf('כ');

		/*
			Return the reverse-order-paralel of this character,
			or the character unchaged if it is not a hebrew letter
			*/
		function reverseChar(c) {
			let ci = alefBet.indexOf(c);
			if (ci < 0) { // Not in the alefBet
				if (c in manzapach) { // Manzapach character
					ci = manzapach[c];
				} else { // Not a hebrew letter
					return c;
				}
			}

			return reverseAlefBet.charAt(ci);
		}

		/*
			Returns the at-bash encription of the given text
			*/
		function atBash() {
			const ca = this.text.trim().split(''); // Char array
			const eca = ca.map(reverseChar); // Encripted char array
			return eca.join('');
		}

		/*
			Returns the al-bam encription of the text
			*/
		function alBam() {
			const step = alefBet.indexOf('ל') - alefBet.indexOf('א');
			return permutate(this.text, step);
		}

		/*
			Input: a character in hebrew, and a permutation step
			output: its permutated value
			*/
		function permChar(c, p) {
			let ci = alefBet.indexOf(c); // Char index
			if (ci < 0) {
				if (c in manzapach) { // Manzapach character
					ci = manzapach[c];
				} else { // Not a hebrew letter
					return c;
				}
			}

			const ni = (ci + p) % 22; // New index

			// TODO what about negative permutions?
			return alefBet.charAt(ni);
		}

		/*
		Input: a token of text, and a permutation step
		output: the token encripted using the permutation
		*/
		function permToken(t, p) {
			if (t.length === 1) {
				return permChar(t, p);
			}

			const ca = t.trim().split(''); // Char array
			const pa = []; // Permutation array
			for (const element of ca) {
				const pc = permChar(element, p);
				pa.push(pc);
			}

			return pa.join(''); // Join the array into a string
		}

		/*
		Input: text in hebrew, direction(1, or -1) of permutation and number of steps
		output: the text encripted as specified

		@param text - text in hebrew
		@param step - the number of steps the permutation has to jump
		@param dir - the direction of the permutation. 1 is forward, -1 is backwards.
		*/
		function permutate(text, step, dir = 1) {
			const p = step * dir;
			const tokens = text.trim().split(' ');
			for (let i = 0; i < tokens.length; i++) {
				tokens[i] = permToken(tokens[i], p);
			}

			return tokens.join(' ');
		}

		/// //////////////
		// constructor //
		/// //////////////
		this.atBash = atBash;
		this.alBam = alBam;
	}
}

