/* You have full freedom on what to write inside this js file */

class Expense {
  constructor(type, amount, desc, date) {
    this.type = type;
    this.amount = amount;
    this.desc = desc;
    this.date = date;
  }
}

const expenses = [];
let itemAmountTotal = 27699.95;

const formatAmount = (value) => {
  numValue = Number(value);
  return numValue.toFixed(2);
};

const filterBills = () => {
  itemAmountTotal = 25550;
  expenses.forEach((expense) => {
    if (expense.type === "Bills") {
      itemAmountTotal += Number(expense.amount);
    }
  });
  $(".financeItem .itemHeader.Bills").parent().show();
  $(".financeItem .itemHeader.Food").parent().hide();
  $(".financeItem .itemHeader.Leisure").parent().hide();
  $("#financesTotal").text(formatAmount(itemAmountTotal));
  console.log("BILLS");
};

const filterFood = () => {
  itemAmountTotal = 150;
  expenses.forEach((expense) => {
    if (expense.type === "Food") {
      itemAmountTotal += Number(expense.amount);
    }
  });
  $(".financeItem .itemHeader.Bills").parent().hide();
  $(".financeItem .itemHeader.Food").parent().show();
  $(".financeItem .itemHeader.Leisure").parent().hide();
  $("#financesTotal").text(formatAmount(itemAmountTotal));
  console.log("FOOD");
};

const filterLeisure = () => {
  itemAmountTotal = 1999.95;
  expenses.forEach((expense) => {
    if (expense.type === "Leisure") {
      itemAmountTotal += Number(expense.amount);
    }
  });
  $(".financeItem .itemHeader.Bills").parent().hide();
  $(".financeItem .itemHeader.Food").parent().hide();
  $(".financeItem .itemHeader.Leisure").parent().show();
  $("#financesTotal").text(formatAmount(itemAmountTotal));
  console.log("LEISURE");
};

const filterAll = () => {
  itemAmountTotal = 27699.95;
  expenses.forEach((expense) => {
    itemAmountTotal += Number(expense.amount);
  });
  $(".financeItem .itemHeader.Bills").parent().show();
  $(".financeItem .itemHeader.Food").parent().show();
  $(".financeItem .itemHeader.Leisure").parent().show();
  $("#financesTotal").text(formatAmount(itemAmountTotal));
  console.log(itemAmountTotal);
};

const filterDisplay = (filterValue) => {
  if ("Bills" === filterValue) {
    filterBills();
  } else if ("Food" === filterValue) {
    filterFood();
  } else if ("Leisure" === filterValue) {
    filterLeisure();
  } else {
    filterAll();
  }
};

const resetFields = () => {
  $("#category").val("Bills");
  $("#amount").val("");
  $("#desc").val("");
  $("#date").val("");
  $("#errorText").text("");
};

const displayDefault = () => {
  $(".itemsList").append(`<div class="financeItem">
                    <div class="itemHeader Bills"> 
                        <span class="itemCategory">Bills</span>
                    </div>
                    <div class="itemBody">
                        <span class="itemDate">2020-03-05</span>
                        <span class="itemDescription">Rent Payment for March</span>
                        <span class="itemAmount">25550.00</span>
                    </div>
                </div>

                <div class="financeItem">
                    <div class="itemHeader Food"> 
                        <span class="itemCategory">Food</span>
                    </div>
                    <div class="itemBody">
                        <span class="itemDate">2020-02-30</span>
                        <span class="itemDescription">Chowking</span>
                        <span class="itemAmount">150.00</span>
                    </div>
                </div>

                <div class="financeItem">
                    <div class="itemHeader Leisure"> 
                        <span class="itemCategory">Leisure</span>
                    </div>
                    <div class="itemBody">
                        <span class="itemDate">2020-02-25</span>
                        <span class="itemDescription">Elden Ring</span>
                        <span class="itemAmount">1999.95</span>
                    </div>
                </div>`);
};

$(document).ready(function () {
  $("#filter").change(() => {
    filterDisplay($("#filter").val());
  });

  $("#submitBtn").click(() => {
    const dateInput = $("#date").val();
    const descInput = $("#desc").val();
    const amountInput = $("#amount").val();

    if (dateInput === "" && descInput === "" && amountInput === "") {
      $("#errorText").text("Multiple input fields are blank/unset");
    } else if (dateInput === "" && descInput === "") {
      $("#errorText").text("Multiple input fields are blank/unset");
    } else if (dateInput === "" && amountInput === "") {
      $("#errorText").text("Multiple input fields are blank/unset");
    } else if (descInput === "" && amountInput === "") {
      $("#errorText").text("Multiple input fields are blank/unset");
    } else if (dateInput === "") {
      $("#errorText").text("Date cannot be left blank");
    } else if (descInput === "") {
      $("#errorText").text("Description cannot be left blank");
    } else if (amountInput === "") {
      $("#errorText").text("Amount cannot be left blank");
    } else {
      amount = $("#amount").val();
      Number(amount);
      amount = formatAmount(amount);

      const expense = new Expense(
        $("#category").val(),
        amount,
        $("#desc").val(),
        $("#date").val()
      );
      expenses.push(expense);

      resetFields();
      refreshExpenses();
      filterDisplay($("#filter").val());
    }
  });

  const refreshExpenses = () => {
    $(".itemsList").empty();

    for (let i = expenses.length - 1; i >= 0; i--) {
      const itemCategoryVal = expenses[i].type;
      const itemAmountVal = expenses[i].amount;
      const itemDescVal = expenses[i].desc;
      const itemDateVal = expenses[i].date;
      const itemAmount = $(
        "<div class='itemAmount'>" + formatAmount(itemAmountVal) + "</div>"
      );
      const itemDesc = $(
        "<div class='itemDescription'>" + itemDescVal + "</div>"
      );
      const itemDate = $("<div class='itemDate'>" + itemDateVal + "</div>");
      const itemBody = $("<div class='itemBody'></div>");
      const itemCategory = $(
        "<div class='itemCategory'>" + itemCategoryVal + "</div>"
      );
      const itemHeader = $(
        "<div class='itemHeader " + itemCategoryVal + "'></div>"
      );
      const financeItem = $("<div class='financeItem'></div>");

      itemBody.append(itemDate);
      itemBody.append(itemDesc);
      itemBody.append(itemAmount);
      itemHeader.append(itemCategory);
      financeItem.append(itemHeader);
      financeItem.append(itemBody);
      $(".itemsList").append(financeItem);

      itemAmountTotal = Number(itemAmountTotal) + Number(expenses[i].amount);
      $("#financesTotal").text(formatAmount(itemAmountTotal));
    }

    displayDefault();
  };
});
