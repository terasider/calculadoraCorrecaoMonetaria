const inflationRates = {
    1994: 22.41,  // Desde julho de 1994
    1995: 22.41,
    1996: 9.56,
    1997: 5.22,
    1998: 1.65,
    1999: 8.94,
    2000: 6.00,
    2001: 7.67,
    2002: 12.53,
    2003: 9.30,
    2004: 7.60,
    2005: 5.69,
    2006: 3.14,
    2007: 4.46,
    2008: 5.90,
    2009: 4.31,
    2010: 5.91,
    2011: 6.50,
    2012: 5.84,
    2013: 5.91,
    2014: 6.41,
    2015: 10.67,
    2016: 6.29,
    2017: 2.95,
    2018: 3.75,
    2019: 4.31,
    2020: 4.52,
    2021: 10.06,
    2022: 5.79,
    2023: 4.52  // Projeção
};

document.getElementById('correctionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const startYear = parseInt(document.getElementById('startYear').value);
    const endYear = parseInt(document.getElementById('endYear').value);

    if (isNaN(amount) || isNaN(startYear) || isNaN(endYear)) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    let correctedAmount = amount;

    if (startYear < endYear) {
        for (let year = startYear; year < endYear; year++) {
            if (inflationRates[year] !== undefined) {
                correctedAmount *= (1 + inflationRates[year] / 100);
            } else {
                alert(`Taxa de inflação para o ano ${year} não encontrada.`);
                return;
            }
        }
        document.getElementById('result').innerText = `O valor corrigido em ${endYear} é R$ ${correctedAmount.toFixed(2)}`;
    } else if (startYear > endYear) {
        for (let year = startYear - 1; year >= endYear; year--) {
            if (inflationRates[year] !== undefined) {
                correctedAmount /= (1 + inflationRates[year] / 100);
            } else {
                alert(`Taxa de inflação para o ano ${year} não encontrada.`);
                return;
            }
        }
        document.getElementById('result').innerText = `O valor em ${startYear} seria R$ ${correctedAmount.toFixed(2)} em ${endYear}`;
    } else {
        document.getElementById('result').innerText = `O valor em ${startYear} é o mesmo em ${endYear}: R$ ${correctedAmount.toFixed(2)}`;
    }
});
