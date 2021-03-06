function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const OPERATIONS = {
        '*': (a, b) => { return a * b },
        '/': (a, b) => { return a / b },
        '+': (a, b) => { return +a + +b },
        '-': (a, b) => { return a - b },
    };
    const PRIORITY = { '+': 0, '-': 0, '*': 1, '/': 1 }
    let numbers = new Array(); // numbers from expr
    let signs = new Array(); // arithmetic characters and brackets from expr

    if (expr.split('').includes(' ') == false) expr = expr.split('').join(' ').trim();
    let exprArray = expr.split(" "); // array of expr items
    // are brackets paired test 
    while (exprArray.includes("")) exprArray.splice(exprArray.indexOf(""), 1);
    let exprJoin = exprArray.join("");
    let openBr = 0;
    let closeBr = 0;
    while (exprJoin.includes("(")) {
        openBr++;
        exprJoin = exprJoin.replace("(", "");
    }
    while (exprJoin.includes(")")) {
        closeBr++;
        exprJoin = exprJoin.replace(")", "");
    }
    if (openBr !== closeBr) throw new Error("ExpressionError: Brackets must be paired");

    exprArray.forEach(elem => {
            // if elem is number then push it to numbers array
            if (/[0-9]/.test(elem)) numbers.push(elem);
            // if elem is ')' then count all before the '(' elem
            else if (elem == ")") {
                while (signs[signs.length - 1] !== '(') {
                    let lastOperation = signs.pop();
                    let b = numbers.pop();
                    let a = numbers.pop();
                    if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
                    numbers.push(OPERATIONS[lastOperation](a, b));
                }
                signs.pop();

            } else if (elem == '(' || PRIORITY[signs[signs.length - 1]] < PRIORITY[elem] || signs[signs.length - 1] == '(') signs.push(elem);
            else {
                // if priority of current element < then element before priority, count 
                while (PRIORITY[elem] <= PRIORITY[signs[signs.length - 1]]) {
                    let lastOperation = signs.pop();
                    let b = numbers.pop();
                    let a = numbers.pop();
                    if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
                    numbers.push(OPERATIONS[lastOperation](a, b));
                }
                signs.push(elem);
            }
        })
        // if signs array is not empty then count
    while (signs.length > 0) {
        let lastOperation = signs.pop();
        let b = numbers.pop();
        let a = numbers.pop();
        if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
        numbers.push(OPERATIONS[lastOperation](a, b));
    }
    return Number(numbers.join())
}

module.exports = {
    expressionCalculator
}