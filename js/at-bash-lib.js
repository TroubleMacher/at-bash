export default class AtBashLib {
	constructor(text) {
		this.text = text;
		this.alefBet = 'אבגדהוזחטיכלמנסעפצקרשת';
		this.reverseAlefBet = 'תשרקצפעסנמלכיטחזוהדגבא';
		this.manzapach = {}; // Manzapach characters' parallels' indexi
		this.manzapach['ם'] = this.alefBet.indexOf('מ');
		this.manzapach['ן'] = this.alefBet.indexOf('נ');
		this.manzapach['ץ'] = this.alefBet.indexOf('צ');
		this.manzapach['ף'] = this.alefBet.indexOf('פ');
		this.manzapach['ך'] = this.alefBet.indexOf('כ');
	}

	/*
	@returns the reverse-order-paralel of this character, or the character unchaged if it is not a hebrew letter
	If the permutation step is defined it returns its permutated value
	*/
	findMatchingChar(character, permutationStep) {
		let characterIndex = this.alefBet.indexOf(character);
		if (characterIndex < 0) { // Not in the alefBet
			if (character in this.manzapach) { // Manzapach character
				characterIndex = this.manzapach[character];
			} else { // Not a hebrew letter
				return character;
			}
		}

		if (permutationStep) {
			const newIndex = (characterIndex + permutationStep) % 22;
			// TODO what about negative permutions?
			return this.alefBet.charAt(newIndex);
		}

		return this.reverseAlefBet.charAt(characterIndex);
	}

	/*
	Input: a token of text, and a permutation step
	output: the token encrypted using the permutation
	*/
	permToken(token, p) {
		if (token.length === 1) {
			return this.findMatchingChar(token, p);
		}

		const characters = [...token.trim()]; // Char array
		const pa = []; // Permutation array
		for (const character of characters) {
			const pc = this.findMatchingChar(character, p);
			pa.push(pc);
		}

		return pa.join(''); // Join the array into a string
	}

	/*
	Input: text in hebrew, direction(1, or -1) of permutation and number of steps
	output: the text encrypted as specified

	@param text - text in hebrew
	@param step - the number of steps the permutation has to jump
	@param dir - the direction of the permutation. 1 is forward, -1 is backwards.
	*/
	permutate(text, step, direction = 1) {
		const p = step * direction;
		const tokens = text.trim().split(' ');
		for (let i = 0; i < tokens.length; i++) {
			tokens[i] = this.permToken(tokens[i], p);
		}

		return tokens.join(' ');
	}

	/*
	Returns the al-bam encryption of the text
	*/
	alBam() {
		const step = this.alefBet.indexOf('ל') - this.alefBet.indexOf('א');
		return this.permutate(this.text, step);
	}

	/*
	@returns Returns the at-bash encryption of the given text
	*/
	atBash() {
		return [...this.text.trim()] // Char array
			.map(letter => this.findMatchingChar(letter)) // Encrypted char array
			.join('');
	}
}

