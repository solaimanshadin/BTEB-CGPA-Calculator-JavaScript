document.getElementById("current_year").innerText = new Date().getFullYear()

// All inputs
const inputs = document.querySelectorAll("input");
let cgpa_array = [];

// Final Result Display  Selector
const final_cgpa = document.querySelector(".final_cgpa");
const final_grade = document.querySelector(".final_grade");


// Action Buttons
const clear = document.querySelector(".clear");
const print = document.querySelector(".print");

// Triggering Action buttons
print.addEventListener("click", () => {
  window.print();
});

clear.addEventListener("click", () => {
  document.querySelector("form").reset();
  final_cgpa.textContent = "?";
  final_grade.textContent = "?";
});

//Calculator  Option Buttons
const calculator_options = document.querySelectorAll(
  ".calculator-options button"
);

// Triggering and highlighting active option
let selected_probidhan = 2016; //Setting 2016 probidhan as Default
let selected_formula = [5, 5, 5, 10, 15, 20, 25, 15]; // Sequential Array All semesters Percentage

for (var i = 0, length = calculator_options.length; i < length; i++) {
  calculator_options[i].onclick = function (e) {
    // Triggering Probidhan
    selected_probidhan = e.target.textContent;

    //Triggering Formula for Selected Probidhadn
    if (selected_probidhan == 2010) {
      selected_formula = [5, 5, 5, 15, 15, 20, 25, 10];
    } else {
      selected_formula = [5, 5, 5, 10, 15, 20, 25, 15];
    }

    var b = document.querySelector(".calculator-options button.active");
    if (b) b.classList.remove("active");
    this.classList.add("active");

    if (cgpa_array.length === 15) {
      final_cgpa.textContent = calculate_result(cgpa_array, selected_formula);
      final_grade.textContent = gradeCalculation(
        calculate_result(cgpa_array, selected_formula)
      );
    }
  };
}

// Fetching all Semester's Results
inputs.forEach((input, key) => {
  input.addEventListener("keyup", (e) => {
    let input = e.target;
    const isValid = validGpa(input.value.trim());
    let grade = input.nextElementSibling;

    if (isValid) {
      grade.value = isValid;
      grade.style.color = "green";
      input.classList.add("valid");
      input.classList.remove("invalid");

      cgpa_array[key] = Number(input.value); //Storing Every input on Array

      // Calculation CGPA on input complete
      if (cgpa_array.length === 15) {
        final_cgpa.textContent = calculate_result(cgpa_array, selected_formula);
        final_grade.textContent = gradeCalculation(
          calculate_result(cgpa_array, selected_formula)
        );
        final_cgpa.style.color = "green";
        final_grade.style.color = "green";
      }
    } else {
      grade.value = "?";
      grade.style.color = null;
      e.target.classList.add("invalid");
      e.target.classList.remove("valid");
    }
  });
});

// Final Result Calculation
const calculate_result = (cgpa_array, formula) => {
  let i = 0; //index of Formula array , we will increment it on loop

  //if Any Semester Result Contain 0.00 , Mark as Fail and CGPA 0.00
  if (cgpa_array.includes(0.0)) {
    return (final_result = 0.0);
  } else {
    const all_gpa_percentage = cgpa_array
      .map((gpa) => (gpa * formula[i++]) / 100)
      .reduce((acc, curr) => (acc += curr), 0);
    final_result = (Math.round(all_gpa_percentage * 100) / 100).toFixed(2);
    return final_result;
  }
};

// CGPA Validator Function
const validGpa = (CGPA) => {
  const regex = /^[01234]{1}\.[\d]{2}$/;

  if (regex.test(CGPA) && CGPA <= 4) {
    return gradeCalculation(CGPA); //Fetching Grade of that CGPA
  } else {
    return false;
  }
};

// Grade Calculation Function
const gradeCalculation = (CGPA) => {
  if (CGPA == 4.0) {
    return "A+";
  } else if (CGPA >= 3.75 && CGPA < 4.0) {
    return "A";
  } else if (CGPA >= 3.5 && CGPA < 3.75) {
    return "A-";
  } else if (CGPA >= 3.25 && CGPA < 3.5) {
    return "B+";
  } else if (CGPA >= 3.0 && CGPA < 3.25) {
    return "B";
  } else if (CGPA >= 2.75 && CGPA < 3.0) {
    return "B-";
  } else if (CGPA >= 2.5 && CGPA < 2.75) {
    return "C+";
  } else if (CGPA >= 2.25 && CGPA < 2.5) {
    return "C";
  } else if (CGPA >= 2.0 && CGPA < 2.25) {
    return "D";
  } else if (CGPA == 0.0) {
    return "F";
  } else {
    return "?";
  }
};
