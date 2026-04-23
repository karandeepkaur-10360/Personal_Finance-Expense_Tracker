document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.getElementById("addExpensebtn");

    const amountInput = document.getElementById("expenseAmount");
    const categorySelect = document.getElementById("expenseCategory");
    const dateInput = document.getElementById("ExpenseDate");
    const typeInput = document.getElementById("expenseType");

    const historyTableBody = document.querySelector("#transactionHistory tbody");
    const expenseText = document.getElementById("totalIncome");

    
    let categoryData = {
        Food: 0,
        Transport: 0,
        Shopping: 0,
        Bills: 0
    };

    let expenseChart;

    const ctx = document.getElementById("expenseChart").getContext("2d");

    expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffcd56",
                    "#4bc0c0"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

  
    function updateChart() {
        expenseChart.data.datasets[0].data = Object.values(categoryData);
        expenseChart.update();
    }

    
    function loadExpenses() {
        fetch("http://localhost:8080/api/expenses")
            .then(res => res.json())
            .then(data => {

                historyTableBody.innerHTML = "";

                let total = 0;

                categoryData = {
                    Food: 0,
                    Transport: 0,
                    Shopping: 0,
                    Bills: 0
                };

                data.forEach(exp => {

                    total += exp.amount;

                    if (categoryData[exp.category] !== undefined) {
                        categoryData[exp.category] += exp.amount;
                    }

                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${exp.date}</td>
                        <td>${exp.type}</td>
                        <td>${exp.category}</td>
                        <td>Expense</td>
                        <td>Rs. ${exp.amount}</td>
                    `;

                    historyTableBody.appendChild(row);
                });

                expenseText.textContent =
                    "Total Expense: Rs. " + total.toFixed(2);

                updateChart();
            })
            .catch(err => console.log("Error loading data:", err));
    }

    addBtn.addEventListener("click", function () {

        const expense = {
            type: typeInput.value.trim(),
            amount: parseFloat(amountInput.value),
            category: categorySelect.value,
            date: dateInput.value
        };

        if (!expense.type || !expense.amount || !expense.date) {
            alert("Please fill all fields!");
            return;
        }

        fetch("http://localhost:8080/api/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        })
        .then(res => res.json())
        .then(() => {
            loadExpenses(); 
        })
        .catch(err => console.log("Error saving data:", err));

        
        amountInput.value = "";
        dateInput.value = "";
        typeInput.value = "";
        categorySelect.selectedIndex = 0;
    });

    
    loadExpenses();

});