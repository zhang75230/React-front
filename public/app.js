
document.getElementById("form").addEventListener("submit", computeResults);

function computeResults(e) {

  const open = document.getElementById("amount").value;
  const openYears = document.getElementById("years").value;

  if(openYears == 1){
      openInterest = 0.3;
  }
  else if(openYears == 3){
      openInterest = 1.5;
  }
  else if(openYears == 5){
      openInterest = 3.0;
  }

  const realInterest = openInterest / 100;
  const totalAmount = parseFloat(open) + parseFloat((realInterest * open) *openYears);
  const earnings = parseFloat(totalAmount) - parseFloat(open);


  document.getElementById("open").innerHTML = "$" + open;

  document.getElementById("openInterest").innerHTML = openInterest + "%";
  
  document.getElementById("earnings").innerHTML = "$" + earnings;

  document.getElementById("totalAmount").innerHTML = "$" + totalAmount;

  e.preventDefault();

}

document.getElementById("form").addEventListener("reset", refresh().computeResults);