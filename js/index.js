import delegate from 'delegate-it';

import AtBashLib from './at-bash-lib.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function changeText() {
    const functionType = document.querySelector(".form-select").value;
    const {value} = document.querySelector('#entry')
    document.querySelector("#display").value = new AtBashLib(value)[functionType]()
}


delegate(document,'#entry', 'input', changeText)
delegate(document,'.form-select', 'change', changeText)