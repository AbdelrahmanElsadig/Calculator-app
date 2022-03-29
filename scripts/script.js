const operations = (() => {
    function addition(a,b) {return a + b};
    function substraction(a,b) {return a-b};
    function multiplication(a,b) {return a*b};
    function division(a,b) {return a/b};
    return {
        '+': addition,
        '-': substraction, 
        '×': multiplication, 
        '/': division
    }
})()


const special_operations = (() => {
    const cur_calc = document.querySelector('.cur');
    const prev_calc = document.querySelector('.prev');
    function del() {
        cur_calc.textContent = cur_calc.textContent.substring(0,cur_calc.textContent.length -1);
    }
    function reset() {
        prev_calc.textContent = null;
        cur_calc.textContent = null;
    }

    function equals() {
        if (prev_calc.textContent.length == 0) return
        const operand = prev_calc.textContent.substring(prev_calc.textContent.length-1);
        const prev_num = parseFloat(prev_calc.textContent.substring(0,prev_calc.textContent.length-1));
        const cur_num = parseFloat(cur_calc.textContent);
        cur_calc.textContent = operations[operand](prev_num,cur_num);
        prev_calc.textContent = null;
    }

    return {
        'DEL': del,
        'RESET': reset,
        '=': equals
    }
})()



const keys_events = (() => {

    // Keys

    const all_keys = [...document.querySelectorAll('.key')];
    const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const number_keys = all_keys.filter(key => numbers.includes(key.textContent));
    const arithmetic_keys = all_keys.filter(key => {
        return !numbers.includes(key.textContent) && 
        ['=','RESET','DEL'].every(item => key.textContent != item);
    });
    const operation_keys = all_keys.filter(key => ['=','RESET','DEL'].includes(key.textContent));
    
    // results box values

    const current_calc = document.querySelector('.cur');
    const prev_calc = document.querySelector('.prev');

    // Key event listeners

    number_keys.forEach(key => {
        key.addEventListener('click', () => {
            current_calc.textContent += key.dataset.key_value;
        })
    });

    arithmetic_keys.forEach(key => {
        key.addEventListener('click', () => {
            if (current_calc.textContent.length == 0) return 
            if (prev_calc.textContent.length > 0){
                let last_char = prev_calc.textContent[prev_calc.textContent.length -1];
                if (['+', '-', '×', '/'].includes(last_char) && 
                current_calc.textContent.length == 0) return 
            }
            let temp = prev_calc.textContent != '' ? parseFloat(prev_calc.textContent):false;
            // prev_calc.textContent = current_calc.textContent +  key.textContent;
            if (temp !== false){
                const prev_operand = prev_calc.textContent.substring(prev_calc.textContent.length -1);
                const new_operand = key.textContent;
                console.log(new_operand)
                const prev_num = parseFloat(prev_calc.textContent.substring(0,prev_calc.textContent.length-1))
                const cur_num = parseFloat(current_calc.textContent);
                prev_calc.textContent = operations[prev_operand](prev_num,cur_num) + new_operand;
                current_calc.textContent = null;
                return
            }
            prev_calc.textContent = current_calc.textContent +  key.textContent;
            current_calc.textContent = null;
        })
    })


    operation_keys.forEach(key => {
        key.addEventListener('click',() => {
            console.log(key.textContent);
            special_operations[key.textContent]()
        })
    })
  
})()

