
let weight = document.getElementById("weight"); 
let height = document.getElementById("height");


// declared variables
let btn = document.getElementById("submit");
let outputWeight = document.getElementById("outputWeight");
let outputHeight = document.getElementById("outputHeight");
let outputDodawanko = document.getElementById("outputDodawanko");


// function which shows reults (counted BMI and display weight and heihght put by user) according to guidelines of the project

function showResults(){
    if(weight.value =="" || height.value ==""){
        outputAlert.innerHTML = `<span style="text-algin: center">All fields are required!</span>`
        outputWeight.innerHTML = "";
        outputHeight.innerHTML = "";
        outputDodawanko.innerHTML = "";
    }
    else if ((weight.value<40 || weight.value>200 || weight.value<0) && (height.value<120 || height.value>240 || height.value<0)) 
    {
        outputAlert.innerHTML = ("Enter correct value of height and weight!");
        outputWeight.innerHTML = "";
        outputHeight.innerHTML = "";
        outputDodawanko.innerHTML = "";
    }
    else if ((height.value<120 || height.value>240 || height.value<0) && (weight.value>=40 && weight.value<=200)) 
    {
        outputAlert.innerHTML = ("Enter correct value of height!");
        outputWeight.innerHTML = "";
        outputHeight.innerHTML = "";
        outputDodawanko.innerHTML = "";
    }
    else if ((weight.value<40 || weight.value>200 || weight.value<0)&& (height.value>=120 || height.value<=240)) 
    {
        outputAlert.innerHTML = ("Enter correct value of weight!");
        outputWeight.innerHTML = "";
        outputHeight.innerHTML = "";
        outputDodawanko.innerHTML = "";
    }
   
    else 
    {
        countBmi();
      }
    }
    
  //function wchich counts BMI, add today's date and hour, reading the value added to a previous Result Key, if there is no value it's assigne 0 instead of value (and also change the string value to the js object). Function also compares values counted with saved values (from results history). In this fucntion results are also saving to local storage. 

function countBmi(){

    var t = [weight.value, height.value];

   let bmiOperation = (((t[0])/((t[1])*(t[1]))*10000)).toFixed(2);
   t.push(bmiOperation);

   outputDodawanko.innerHTML = t[2];

    outputWeight.innerHTML = "Your weight is: " + t[0] + " kg";
    outputHeight.innerHTML = "Your height is: " + t[1]  + " cm";
    outputAlert.innerHTML = " ";

    let previousResult = JSON.parse(localStorage.getItem("previousResult")) || 0;

      if (bmiOperation > previousResult) {
        outputAlertSecond.innerHTML ="<br>"+ `<span style="text-align:center; margin-left:30%;color: #f6e3cf;">Your BMI increased</span>`;
    } else if (bmiOperation < previousResult) {
        outputAlertSecond.innerHTML = "<br>"+ `<span style="text-align:center; margin-left:30%;color: #f6e3cf;">Your BMI decreased</span>`;
      } else {
        outputAlertSecond.innerHTML = "<br>"+ `<span style="text-align:center; margin-left:10%;color: #f6e3cf;"> Your BMI is the same as last measured</span>`;
    }
    

    localStorage.setItem("previousResult", bmiOperation);

//new creates a new empty object and adds it for a new variable now, function is called. If it's not undefinied value, function returns as a result of function called. Date in JS is actual date: Date(year, month, day, hour, minutes, seconds). Below from the Data function is getting date and time. 

    let now = new Date();
   let date = now.getDate()+ '/'+ (now.getMonth() + 1) + '/'+ now.getFullYear();
   let time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

   // setting result of measures + date and time

let result = {
    weight: t[0],
    height: t[1],
    bmi: bmiOperation,
    date: date,
     time: time
  };

  // new variable which gets and sets results (variable result above) and sets them to local storage and saves it at the table

let results = JSON.parse(localStorage.getItem("results")) || [];
results.push(result);
localStorage.setItem("results", JSON.stringify(results));

// calculate average

//sum bmi has first variable as zero. 

let sumBmi = 0;
for (let i = 0; i < results.length; i++) {
    sumBmi += Number(results[i].bmi);
}
let averageBmi = sumBmi / results.length;



document.getElementById("average").innerHTML = `<strong><span style="color: #f6e3cf; font-size:1.0vw">Average of BMI measurements: ${averageBmi.toFixed(2)}</strong></span>`;

results.reverse(); //flipping elements in array
let html = "";



html += `<p><strong><span style="color: #f6e3cf; font-size:1.2vw"> ${result.date} ${result.time} </strong></span></p>`;
html += `<p><strong>Height:</strong> ${result.height} kg <strong>Weight:</strong> ${result.weight} cm </p>`;
html += `<p><strong>BMI:</strong> ${result.bmi}</p>`;
html += `<hr>`;

document.getElementById("resultsfirst").innerHTML += html;

}

// in this function saved results are displayed on the third column with result history. Values are getting from localstorage. This function also conuts average of measurements. 

function displayResults() {

  
    let results = JSON.parse(localStorage.getItem("results")) || [];
  
    let html = "";
    let startIndex = Math.max(results.length - 100, 0);
    for (let i = results.length - 1; i >= startIndex; i--) {
      
 

     html += `<p><strong><span style="color: #f6e3cf; font-size:1.2vw"> ${results[i].date} ${results[i].time} </strong></span></p>`;
      html += `<p><strong>Height:</strong> ${results[i].height} kg <strong>Weight:</strong> ${results[i].weight} cm </p>`;
      html += `<p><strong>BMI:</strong> ${results[i].bmi}</p>`;
      html += `<hr>`;

      document.getElementById("results").innerHTML = html;
     
      
    }
  

    document.getElementById("results").innerHTML = html;
    

  
    //here "for" loop iterates over elements in array. Its starts from zero and its increasing by one in each iterate. It is using as a index to get value from the table. Bmi value is added to the average variable, after the loop stops the overall value of bmi is devided by length of the results array.
    
    let average = 0;
    for (let i = 0; i < Number(results.length); i++) 
    {
        average += Number(results[i].bmi);
    }
    average /= Number(results.length);

    localStorage.setItem("average", JSON.stringify(average));
    average = JSON.parse(localStorage.getItem("average"))
    
    document.getElementById("average").innerHTML = html;

    document.getElementById("average").innerHTML = `<strong><span style="color: #f6e3cf; font-size:1.0vw">Average of BMI measurements: ${average.toFixed(2)}</strong></span>`;
    }


    
  // display results after page refresh 

  window.onload = function() {
    displayResults();
  };

 
btn.addEventListener('click', () => { 
    showResults();
});


function clearLocalStorage() {
  localStorage.clear();
  location.reload();
  alert("Your history results will be cleared!");
}




/*Inputy- po wciśnięciu przycisku zatwierdź. 
Jeśli użytkownik poda liczbę poza zakrsem wyświetl komunikat (w module wyświetlania wyników), że podana liczba jest niepoprawna (wzorst/ waga/ wzrost+waga) nie przyjmuj takiej liczby i jej nie zapisuj do historii, nie wyświetlaj jej. 

Zakresy:
Waga: dowolna wartość liczbowa
zmiennoprzecinkową z zakresu 40 - 200
Wzrost: dowolna wartość
liczbowa zmiennoprzecinkową z zakresu 120 - 240

Alerty:
a) jeśli waga nie jest poprawna, w module wyświetlania wyników
powinien pojawić się komunikat “waga nie jest poprawna”
b) jeśli wzrost nie jest poprawny, w module wyświetlania wyników
powinien pojawić się komunikat “wzrost nie jest poprawny"

Jeśli liczba będzie okej- zamień string na number i policz BMI oraz wyświetl paramtery w module II. 

Jeśli wartości są poprawne:
a) wyliczane jest BMI z pomocą wzoru
(1) BMI = masa / wzrost2
b) wpisany wzrost pojawia się w module wyświetlania wyników
c) wpisana waga pojawia się w module wyświetlania wyników
d) wyliczone BMI pojawia się w module wyświetlania wyników (FONT WIĘKSZY NIŻ POZOSTAŁE)
e) jeśli w historii pomiaru znajduje się już poprzednia wartość BMI:

    (1) jeśli nowo wyliczona wartość jest niższa niż ostatnia z historii, w module wyświetlania wyników powinno wyświetlić się dodatkowo “Twoje BMI spadło!”
    (2) jeśli nowo wyliczona wartość jest wyższa niż ostatnia z historii, w module wyświetlania wyników powinno wyświetlić się dodatkowo “Twoje BMI wzrosło!”

f) do historii pomiaru dopisuje się zestaw danych: wpisany wzrost,
wpisana waga, wyliczona wartość BMI oraz obecna data i godzina
g) w module historii pomiarów przelicza się i zostaje wyświetlona
średnia wykonanych dotąd pomiarów
h) pola do wpisywania wzrostu oraz wagi powinny zostać
wyczyszczone

MODUŁ WYŚWIETLANIA HISTORII POMIARÓW:
A. W module wyświetlania historii pomiarów powinna być wyświetlana lista
wszystkich pomiarów dokonanych dotychczasowo w aplikacji
1. Każdy element listy powinien mieć etykietę “Pomiar z [DATA I GODZINA]”
a) [DATA I GODZINA] jest dowolnie sformatowaną datą i godziną tak,
by było widać dzień, miesiąc, rok, godzinę, minutę i sekundę
2. Po kliknięciu w któryś element na liście historii pomiarów, w module
wyświetlania wyników powinny załadować się szczegóły zapamiętane
podczas danego pomiaru:
a) Wzrost
b) Waga
c) Wynik BMI
3. Po kliknięciu w któryś element na liście historii pomiarów, w module
wyświetlania wyników nie wyświetlamy informacji o błędzie ani informacji
o tym czy BMI spadło czy wzrosło
B. Pod listą historii pomiarów powinna wyświetlać się średnia wszystkich
wyliczonych BMI
C. Wymagania opcjonalne dla chętnych:
1. po przeładowaniu aplikacji (odświeżeniu strony) aplikacja powinna
zapamiętać poprzednią historię pomiarów
2. pod listą historii pomiarów powinien znaleźć się przycisk “czyść” który
czyści historię
*/
