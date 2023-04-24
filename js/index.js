import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import AtBashLib from './at-bash-lib.js';

function changeText() {
	const functionType = document.querySelector('.form-select').value;
	const {value} = document.querySelector('#entry');
	document.querySelector('#display').value = new AtBashLib(value)[functionType]();
}

document.querySelector('#entry').addEventListener('input', changeText);
document.querySelector('.form-select').addEventListener('change', changeText);
