const fs = require('fs');

const validateMessage = {
	success: 'Success. File is valid.',
	error: 'Error. File is not valid!',
};

module.exports = class {
	constructor(dir, file) {
		this.path = `${__dirname}/../${dir}/${file}`;
		this.fileText = '';
	}

	checkAccess() {
		try {
			fs.accessSync(this.path, fs.constants.R_OK || fs.constants.W_OK);
			return true;
		} catch (err) {
			return false;
		}
	}

	validate() {
		let symbols = ['[', ']', '{', '}', '(', ')'];
		let brackets = {
			array: [],
			pairs: {
				']': '[',
				'}': '{',
				')': '(',
			},
		};

		if (this.checkAccess(this.path)) {
			this.fileText = fs.readFileSync(this.path).toString();
		} else {
			return 'Error. Can\'t read file!';
		}

		for (let i = 0; i < this.fileText.length; i++) {
            let symbol = this.fileText[i];
            let isBracket = symbols.some(item => item === this.fileText[i])
            
			if (isBracket) {
				if (brackets.array[brackets.array.length - 1] && brackets.array[brackets.array.length - 1] === brackets.pairs[symbol]) {
					brackets.array.pop();
				} else {
					brackets.array.push(this.fileText[i]);
				}
			}
        }
        
		if (brackets.array.length) {
			return validateMessage.error;
		}
		return validateMessage.success;
	}
};