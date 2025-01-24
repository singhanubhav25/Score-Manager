
let allbtns = document.querySelectorAll('.button');

let choosedNumber = 0;
let count = 0;

let boxText = document.querySelector('.boxText');
let wicketText = document.querySelector('.wicketText');
let overR = document.querySelector('.overRate');

allbtns.forEach(bt => {

    bt.addEventListener('click', (e) => {
        choosedNumber = e.target.innerHTML;
        count++;

        let num1 = Math.floor(count / 6);
        let num2 = count % 6;


        if (choosedNumber === 'out') {
            wicketText.innerText = parseInt(wicketText.innerText) + parseInt(1);
        } else {
            boxText.innerText = parseInt(boxText.innerText) + parseInt(choosedNumber);
        }
        overR.innerText = `(${num1}.${num2})`;

        let res = num2 === 0 ? 6 : num2;


        let columnTop = document.querySelectorAll('.balln');

        for (let i = 0; i < res; i++) {
            columnTop[i].textContent = choosedNumber;
        }

        let columnBottom = document.querySelectorAll('.ballb');

        for (let i = 0; i < count; i++) {

            columnBottom[i].innerText = choosedNumber;
        }

        const scoreUpdate = async () => {
            const data = {
                boxText: boxText.innerText,
                wicketText: wicketText.innerText,
                overR: overR.innerText,
            };

            try {
                const response = await fetch('http://localhost:3000/api/scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Send data in the request body
                });

                if (!response.ok) {
                    throw new Error('Failed to save data');
                }
                console.log('Data saved successfully');
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }

    });
});

// Function to send data to the backend
$('#btn0').on('click', function () {
    saveButtonClick('0');
});

$('#btn1').on('click', function () {
    saveButtonClick('1');
});

$('#btn2').on('click', function () {
    saveButtonClick('2');
});

$('#btn3').on('click', function () {
    saveButtonClick('3');
});
$('#btn4').on('click', function () {
    saveButtonClick('4');
});
$('#btn6').on('click', function () {
    saveButtonClick('6');
});
$('#btnout').on('click', function () {
    saveButtonClick('out');
});

function saveButtonClick(buttonName) {
    $.ajax({
        url: 'http://localhost:5000/api/button',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ buttonName }),
        success: function (response) {
            console.log(`${buttonName} click saved!`);
            
        },
        error: function (error) {
            console.error('Error saving button click:', error);
        }
    });
}
