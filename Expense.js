let Expensename=document.querySelector("#name-input"),
amountExpense=document.querySelector("#amount-input"),
categoryExpense=document.querySelector("#category-input"),
dateExpense=document.querySelector("#date-input"),
notesExpense=document.querySelector("#notes-input"),
addExpense=document.querySelector("#add-expense");
clearall=document.querySelector(".clearall");
Loadmore=document.querySelector(".Load-more");
balance=document.querySelector(".total-balance");
 summaryValues = document.querySelectorAll(".summary-row h1");
 progress = document.querySelector(".progress");
 budgetText = document.querySelector(".budget");
 percentageText = document.querySelector(".percentage");
 category=document.querySelector(".category");

 
 

let expense=[];
addExpense.onclick=function (event){
  event.preventDefault(); 
   let name= Expensename.value;
   let amount=amountExpense.value;
   let category=categoryExpense.value;
   let date=dateExpense.value;
   let notes=notesExpense.value;


 let addnewexpense={
   name,amount,category,date,notes
};
expense. push(addnewexpense);
console.log(expense);
 displayExpense();
 updateBalance();
updatesumary();
expenseCategory();
updateTopCategories();

Expensename.value="";
amountExpense.value="";
categoryExpense.value="";
dateExpense.value="";
notesExpense.value="";

};
let tbody=document.querySelector(".tbody");
function displayExpense(){
  tbody.innerHTML= "";

  expense.slice(0,visibleExpenses).forEach(function(item,index){
    let icon = "🧾";

if (item.category.toLowerCase() === "food") {
    icon = "🍔";
} else if (item.category.toLowerCase() === "transport") {
    icon = "🚌";
} else if (item.category.toLowerCase() === "shopping") {
    icon = "🛍️";
} else if (item.category.toLowerCase() === "education") {
    icon = "📚";
} else if (item.category.toLowerCase() === "entertainment") {
    icon = "🎬";
} else if (item.category.toLowerCase() === "medicine") {
    icon = "💊";
} else if (item.category.toLowerCase() === "travel") {
    icon = "✈️";
} else if (item.category.toLowerCase() === "gym") {
    icon = "🏋️";
} else if (item.category.toLowerCase() === "bills") {
    icon = "🧾";
} else if (item.category.toLowerCase() === "rent") {
    icon = "🏠";
} else if (item.category.toLowerCase() === "grocery") {
    icon = "🛒";
}
     
    tbody.innerHTML += `
    <tr>
    <td>${index+ 1}</td>
    <td><span class="expense-icon">${icon}</span> ${item.name}</td>
     <td><span class="do">${item.category}</span></td>
      <td>${item.amount}</td>
       <td>${item.date}</td>

        <td>
        <button id="delet" onclick="deleteExpense(${index})"> <i  class="fa-solid fa-trash-can"></i> </button>
        </td>
    </tr>
    `;

  });
 
}
function deleteExpense(index){
  expense.splice(index,1);
  displayExpense();
  updateBalance();
  updatesumary();
  expenseCategory();
  updateTopCategories();
}
clearall.onclick=function(){
  expense=[];
   displayExpense();
   updateBalance();
  updatesumary();
  expenseCategory();
  updateTopCategories();
}
let visibleExpenses=5;
Loadmore.onclick=function(){
  visibleExpenses += 5;
   displayExpense();
};
function updateBalance(){
  let total=0;
  expense.forEach(function(item){
    total += Number(item.amount);

  });
  balance.innerText=`₹ ${total}`;
}
function updatesumary(){
  let total=0
  expense.forEach(function(item){
    total += Number(item.amount);
  });
  summaryValues[0].innerText=`₹${total.toFixed(2)}`;
  summaryValues[1].innerText=expense.length;
  let budget=5000;
  if(budget>0){

    let percentage=(total/budget)*100;
    progress.style.width=`${Math.min(percentage,100)}%`;


     percentageText.innerText=`${percentage.toFixed(0)} % of monthly budget`;
  }
}
function expenseCategory() {

  let categoryTotal = {};

  expense.forEach(function(item) {

    let categoryName = item.category.trim().toLowerCase();

    if (categoryTotal[categoryName]) {
      categoryTotal[categoryName] += Number(item.amount);
    } else {
      categoryTotal[categoryName] = Number(item.amount);
    }

  });

  let total = 0;

  expense.forEach(function(item) {
    total += Number(item.amount);
  });

  let categoryList = document.querySelector(".category ul");

  categoryList.innerHTML = "";

  let gradientParts = [];
  let currentPercentage = 0;

  Object.keys(categoryTotal).forEach(function(categoryName, index) {

    let amount = categoryTotal[categoryName];

    let percentage =
      total > 0 ? (amount / total) * 100 : 0;

    let displayName =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1);

    categoryList.innerHTML += `
      <li class="cfood">
        <span>${displayName}</span>
        <span>₹${amount} (${percentage.toFixed(1)}%)</span>
      </li>
    `;

    let start = currentPercentage;
    let end = currentPercentage + percentage;

    let color = `hsl(${index * 70}, 70%, 50%)`;

    gradientParts.push(
      `${color} ${start}% ${end}%`
    );

    currentPercentage = end;

  });

  let donutChart =
    document.querySelector(".donut-chart");

  donutChart.style.background = `
    conic-gradient(
      ${gradientParts.join(", ")}
    )
  `;
}
function updateTopCategories() {

  let categoryTotal = {};

  expense.forEach(function(item) {

    let categoryName = item.category.trim().toLowerCase();

    if (categoryTotal[categoryName]) {
      categoryTotal[categoryName] += Number(item.amount);
    } else {
      categoryTotal[categoryName] = Number(item.amount);
    }

  });

  let sortedCategories = Object.entries(categoryTotal);

  sortedCategories.sort(function(a, b) {
    return b[1] - a[1];
  });

  let topCategoryList = document.querySelector(".top-category-list");

  topCategoryList.innerHTML = "";

  sortedCategories.forEach(function(item, index) {

    let categoryName = item[0];
    let amount = item[1];

    let displayName =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1);

    topCategoryList.innerHTML += `
      <li>
        • ${displayName}
        <span>₹${amount}</span>
      </li>

      <div class="progress-bar2">
        <div class="progress2"></div>
      </div>
    `;
  });
}
function goDashboard() {
    document.querySelector(".balance").scrollIntoView({
        top: 0,
        behavior: "smooth"
    });
}

function goTransactions() {
    document.querySelector(".recent").scrollIntoView({
        behavior: "smooth"
    });
}

function goAnalytics() {
    document.querySelector(".category").scrollIntoView({
        behavior: "smooth"
    });
}