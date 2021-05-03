// function expression В аргументы функции передается type и values
// далее функция фильтрует каждый элемент values и сравнивает их с переданным типом, который был передан первым аргументом и через spread оператор возвращает массив отфильтрованных значений 
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {  //function expression
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));  //объявляется переменная, в которую из DOM дерева по селектору собирается NodeLIst и из него делается массив.
		responseBlocksArray.forEach(block => block.style.display = 'none');  // через forEch для каждого эл-та массива вызывается callback функция и задается стиль display: none 
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //объявляется функция с 3мя аргументами
		hideAllResponseBlocks();  // Вызов функции hideAllResponseBlocks()
		document.querySelector(blockSelector).style.display = 'block';  // находится элемент на странице с селектором переданным через blockSelector и задается стиль display: block
		if (spanSelector) {  // если spanSelector существует выполняется след условие:
			document.querySelector(spanSelector).textContent = msgText;  // находится элемент на странице с селектором переданным через spanSelector и текст содержание в эл-те будет равен переданному аргументу msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Функция высшего порядка.  msgText находится в замыкании

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Функция высшего порядка.  msgText находится в замыкании

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => { //объявляется функция с 2мя аргументами
		try {  // В блоке try описан код, который интерпритатор попробует выполнить, а в случае ошибки перейдет в блок catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // функция eval позволяет выполнять строку кода. В данной строке вызывается функция filterByType передавая аргументы type и values полученные из функции tryFilterByType. Из функции filterByType возвращается массив, который в свою очередь через метод join становится строкой. Результат записывается в переменную valuesArray

			// Объявление переменной через тернарный оператор
			const alertMsg = (valuesArray.length) ? // Какая длина строки в переменной valuesArray, если будет 0 (ноль), то вернётся false
				`Данные с типом ${type}: ${valuesArray}` :  // Если больше 0, то в переменную записывается эта строка
				`Отсутствуют данные типа ${type}`;  // Если нет, то эта
			showResults(alertMsg);  // Вызывается функция showResults в аргумент передается результат тернарного оператора
		} catch (e) { // Если произошла ошибка в блоке try
			showError(`Ошибка: ${e}`);  // Вызывается функция showError в аргумент передается сообщение `Ошибка: какаая была ошибка`
		}
	};

const filterButton = document.querySelector('#filter-btn');  // Находим кнопку через селектор #-значит id

filterButton.addEventListener('click', e => {  // Вешаем обработчик событий на кнопку через клик. Callback функция в аргументе event
	const typeInput = document.querySelector('#type');  // Находим select через селектор #-значит id
	const dataInput = document.querySelector('#data');  // Находим input через селектор #-значит id

	if (dataInput.value === '') {  // Проверка, если поле input пустое, то:
		dataInput.setCustomValidity('Поле не должно быть пустым!');  // Выводить кастомное сообщение
		showNoResults();  //Вызывается функция showNoResults
	} else {  // Если поле input не пустое, то:
		dataInput.setCustomValidity('');  // поменять кастомное сообщение на пустое значение
		e.preventDefault();  // Отмена обычных действий браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());  //Вызывается функция tryFilterByType. В аргументы передаются значения с удаленными вначале и в конце пробелами
	}
});

