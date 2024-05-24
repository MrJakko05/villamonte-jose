(() => {
    const App = {
        htmlElements: {
            logoutBtn: document.getElementById('logout-btn'),
            userProfile: document.getElementById('user-profile'),
            typeSelect: document.getElementById('typeSelect'),
            amountInput: document.getElementById('amountInput'),
            addButton: document.getElementById('addButton'),
            dataTable: document.getElementById('dataTable'),
            dataTableBody: document.getElementById('dataTable').getElementsByTagName('tbody')[0],
            noDataMessage: document.getElementById('noDataMessage'),
            dataChart: document.getElementById('dataChart'),
            totalIncome: document.getElementById('totalIncome'),
            totalExpense: document.getElementById('totalExpense'),
            incomeBarLabel: document.getElementById('incomeBarLabel'),
            expenseBarLabel: document.getElementById('expenseBarLabel')
        },
        init() {
            App.bindEvents();
            App.methods.onLoading();
        },
        bindEvents() {
            App.htmlElements.logoutBtn.addEventListener('click', App.handlers.logout);
            App.htmlElements.userProfile.addEventListener('click', App.handlers.profileNav);
            App.htmlElements.addButton.addEventListener('click', App.handlers.addData);
        },
        handlers: { 
            logout() {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "login.html";
            },
            profileNav() {
                window.location.href = "profile.html";
            },
            loadFinancialData(username) {
                const financialData = JSON.parse(localStorage.getItem(`financialData_${username}`)) || [];
                if (financialData.length === 0) {
                    App.htmlElements.noDataMessage.style.display = 'block';
                    App.htmlElements.dataTable.style.display = 'none';
                    App.htmlElements.dataChart.style.display = 'none';
                } else {
                    App.htmlElements.noDataMessage.style.display = 'none';
                    App.htmlElements.dataTable.style.display = 'table';
                    App.htmlElements.dataChart.style.display = 'flex';

                    // Limpia las filas existentes
                    App.htmlElements.dataTableBody.innerHTML = ''; 

                    let incomeTotal = 0;
                    let expenseTotal = 0;

                    financialData.forEach(entry => {
                        const row = App.htmlElements.dataTableBody.insertRow();
                        const cellIncome = row.insertCell(0);
                        const cellExpense = row.insertCell(1);

                        if (entry.type === 'income') {
                            cellIncome.textContent = entry.amount;
                            cellExpense.textContent = '';
                            incomeTotal += entry.amount;
                        } else if (entry.type === 'expense') {
                            cellIncome.textContent = '';
                            cellExpense.textContent = entry.amount;
                            expenseTotal += entry.amount;
                        }
                    });

                    App.htmlElements.totalIncome.textContent = incomeTotal;
                    App.htmlElements.totalExpense.textContent = expenseTotal;

                    App.handlers.renderChart(incomeTotal, expenseTotal);
                }
            },
            addData() {
                const username = localStorage.getItem("username");
                const type = App.htmlElements.typeSelect.value;
                const amount = parseFloat(App.htmlElements.amountInput.value);
                if (isNaN(amount) || amount <= 0) {
                    alert('Por favor ingrese un monto válido');
                    return;
                }

                const financialData = JSON.parse(localStorage.getItem(`financialData_${username}`)) || [];
                financialData.push({ type, amount });
                localStorage.setItem(`financialData_${username}`, JSON.stringify(financialData));

                App.htmlElements.amountInput.value = '';
                App.handlers.loadFinancialData(username);
            },
            renderChart(incomeTotal, expenseTotal) {
                const total = incomeTotal + expenseTotal;
                const incomePercentage = total > 0 ? (incomeTotal / total) * 100 : 0;
                const expensePercentage = total > 0 ? (expenseTotal / total) * 100 : 0;

                const incomeBar = App.htmlElements.dataChart.querySelector('.bar.income > div');
                const expenseBar = App.htmlElements.dataChart.querySelector('.bar.expense > div');

                incomeBar.style.height = `${incomePercentage}%`;
                expenseBar.style.height = `${expensePercentage}%`;

                App.htmlElements.incomeBarLabel.textContent = `${incomePercentage.toFixed(2)}%`;
                App.htmlElements.expenseBarLabel.textContent = `${expensePercentage.toFixed(2)}%`;
            }
        },
        methods: {
            onLoading() {
                var isLoggedIn = localStorage.getItem("isLoggedIn");
                if (!isLoggedIn) {
                    window.location.href = "login.html";
                } else {
                    const username = localStorage.getItem("username");
                    const userDataElement = document.getElementById("userData");
                    if (userDataElement) {
                        userDataElement.innerHTML = localStorage.getItem("username");
                    }
                    App.handlers.loadFinancialData(username);
                }
            },
        }
    };

    App.init();
})();