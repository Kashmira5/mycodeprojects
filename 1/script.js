const expressionDisplay = document.getElementById("expression");
  const resultDisplay = document.getElementById("result");
  const buttons = document.querySelectorAll("button");

  let expression = "";

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        expression = "";
        expressionDisplay.textContent = "";
        resultDisplay.textContent = "0";
      } 
      else if (value === "DEL") {
        expression = expression.slice(0, -1);
        expressionDisplay.textContent = expression;
      } 
      else if (value === "RESULT") {
        try {
          const exp = expression
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/%/g, "%");
          const result = eval(exp);
          resultDisplay.textContent = result;
          expressionDisplay.textContent = expression;
          expression = result.toString();
        } catch {
          resultDisplay.textContent = "Error";
        }
      } 
      else {
        expression += value;
        expressionDisplay.textContent = expression;
      }
    });
  });