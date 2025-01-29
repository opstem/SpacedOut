document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://hcb.hackclub.com/spacedout/transactions?show_mock_data=true';
    const hcbData = document.getElementById('hcb-data');
    fetch(url).then(response => response.text()).then(data => { 
        const parser = new DOMParser(); 
        const doc = parser.parseFromString(data, 'text/html');
        const desiredElement = doc.querySelector('tbody[data-behavior="transactions"]');
        if (!desiredElement) { hcbData.textContent = 'Element not found'; return; }
        const tableRowElements = desiredElement.querySelectorAll('tr');
        let formattedData = '<table><tr><th>Memo</th><th>Amount</th><th>Date</th></tr>';
        tableRowElements.forEach(tableRow => {
            let memoText = tableRow.querySelector('td.transaction__memo')?.textContent.trim() || 'None';
            memoText = memoText.replace(/\s*\d+$/, '');
            const dataArray = [
                memoText,
                tableRow.querySelector('td.nowrap')?.textContent.trim() || 'None',
                tableRow.querySelector('td:not([class])')?.textContent.trim() || 'None'
            ];
            formattedData += `<tr>
                <td>${dataArray[0]}</td>
                <td>${dataArray[1]}</td>
                <td>${dataArray[2]}</td>
            </tr>`;
        });
        formattedData += '</table>';
        hcbData.innerHTML = formattedData;
    }).catch(error => { hcbData.textContent = 'Error fetching data: ' + error; });
});