let candidates = [];

function addCandidate() {
    const name = document.getElementById('candidate-name').value;
    const color = document.getElementById('candidate-color').value;

    candidates.push({ name, color, votes: 0 });

    updateCandidatesList();
    updateChart();
}

function removeCandidate(index) {
    candidates.splice(index, 1);
    updateCandidatesList();
    updateChart();
}

function addVote(index) {
    candidates[index].votes++;
    updateChart();
    updateCandidatesList();
}

function updateCandidatesList() {
    const list = document.getElementById('candidate-list');
    list.innerHTML = '';
    candidates.forEach((candidate, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="color: ${candidate.color};">${candidate.name}</span>
            <span>${candidate.votes} votos</span>
            <button onclick="addVote(${index})">+1 voto</button>
            <button onclick="removeCandidate(${index})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

function updateChart() {
    const chart = document.getElementById('chart');
    chart.innerHTML = '';

    const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);
    const angleUnit = totalVotes > 0 ? 360 / totalVotes : 0;

    let startAngle = 0;

    candidates.forEach((candidate, index) => {
        const div = document.createElement('div');
        div.className = 'slice';
        div.style.backgroundColor = candidate.color;
        div.style.transform = `rotate(${startAngle}deg)`;

        const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
        div.style.clipPath = `polygon(${calculatePolygonPoints(percentage)}%)`;
        div.style.animation = `fill${index} 1s forwards`;
        div.style.animationDelay = `${index * 0.1}s`;

        chart.appendChild(div);

        startAngle += angleUnit * candidate.votes;
    });
}

function calculatePolygonPoints(percentage) {
    const points = [];
    for (let i = 0; i <= 360; i += 1) {
        const x = 50 + 50 * Math.cos((i * Math.PI) / 180);
        const y = 50 + 50 * Math.sin((i * Math.PI) / 180);
        points.push(`${x}% ${y}%`);
    }
    return points.join(', ');
}