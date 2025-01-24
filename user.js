async function updateBallDisplay() {

    const response = await fetch('/api/button');
    const data = await response.json();

    document.getElementById('heading').textContent = `${data.runs}/${data.wickets}`;
    document.getElementById('subbheading').textContent = `over(${data.overs})`;

    const balls = data.currentOver;
    balls.forEach((value, index) => {
      const ballElement = document.getElementById(`ball${index + 1}`);
      ballElement.innerText = value;
    });
  }

  setInterval(updateBallDisplay, 1000);