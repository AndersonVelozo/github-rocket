fetch("./data/contributions.json")
  .then((res) => res.json())
  .then((data) => {
    const total = data.totalContributions || 0;
    const rocket = document.getElementById("rocket");

    const bottomPercent = Math.min((total / 365) * 100, 80);
    rocket.style.bottom = \`\${bottomPercent}vh\`;

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 150; i++) {
        ctx.fillStyle = "white";
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    drawStars();
  });