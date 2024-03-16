function confetti(options) {
    // Confetti particle element
    const particle = document.createElement("div");
    particle.className = "confetti";
    // Set particle position
    particle.style.left = options.origin.x * 100 + "%";
    particle.style.top = options.origin.y * 100 + "%";
    // Set particle velocity
    const velocity = options.startVelocity * 0.5 + Math.random() * options.startVelocity;
    particle.style.setProperty('--rotate-start', `${Math.random() * 360}deg`);
    particle.style.setProperty('--rotate-end', `${Math.random() * 360}deg`);
    // Append particle to the container
    document.getElementById("confettiContainer").appendChild(particle);
    // Remove particle after animation
    particle.addEventListener("animationend", function () {
        particle.remove();
    });
}

console.log("confetti");