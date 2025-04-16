// Format number with commas for Indian numbering system (lakh, crore)
function formatIndianNumber(num) {
    const numStr = num.toString();
    let result = '';
    let count = 0;
    
    // Process characters from right to left
    for (let i = numStr.length - 1; i >= 0; i--) {
        count++;
        result = numStr[i] + result;
        
        // Add commas according to Indian number system
        if (count === 3 && i !== 0) {
            result = ',' + result;
        } else if (count > 3 && (count - 3) % 2 === 0 && i !== 0) {
            result = ',' + result;
        }
    }
    
    return result;
}

// Calculate EMI amount
function calculateEMI() {
    // Add animation class during calculation
    document.getElementById('emi').parentElement.classList.add('calculating');
    
    setTimeout(() => {
        // Get input values
        const principal = parseFloat(document.getElementById('loanAmount').value);
        const tenure = parseFloat(document.getElementById('tenure').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value);
        
        // Convert interest rate to monthly and in decimal
        const monthlyRate = interestRate / 12 / 100;
        const tenureInMonths = tenure * 12;
        
        // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
        
        // Total amount and interest calculation
        const totalAmount = emi * tenureInMonths;
        const totalInterest = totalAmount - principal;
        
        // Update display with formatted values
        document.getElementById('emi').textContent = formatIndianNumber(Math.round(emi));
        document.getElementById('principal').textContent = '₹ ' + formatIndianNumber(principal);
        document.getElementById('totalInterest').textContent = '₹ ' + formatIndianNumber(Math.round(totalInterest));
        document.getElementById('totalAmount').textContent = '₹ ' + formatIndianNumber(Math.round(totalAmount));
        
        // Update chart if present
        updateChart(totalInterest, principal);
        
        // Remove animation class
        document.getElementById('emi').parentElement.classList.remove('calculating');

        // Animate the values changing
        animateValueChange('emi');
        
    }, 500); // Slight delay for animation effect
}

// Function to update chart based on principal and interest ratio
function updateChart(interest, principal) {
    const total = interest + principal;
    const interestPercentage = (interest / total) * 100;
    const principalPercentage = (principal / total) * 100;
    
    // Update chart visualization if it exists
    const chartElement = document.querySelector('.chart-circle');
    if (chartElement) {
        chartElement.style.background = `conic-gradient(#1976d2 ${principalPercentage}%, #64b5f6 ${principalPercentage}% 100%)`;
        document.getElementById('chart-percent').textContent = `${Math.round(interestPercentage)}%`;
        document.getElementById('chart-percent').setAttribute('title', 'Interest Percentage');
    }
}

// Animation for changing values
function animateValueChange(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 1000);
}

// Update functions for sliders
function updateLoanAmount(value) {
    document.getElementById('loanAmountDisplay').textContent = formatIndianNumber(value);
    calculateEMI();
}

function updateTenure(value) {
    document.getElementById('tenureDisplay').textContent = value;
    calculateEMI();
}

function updateInterestRate(value) {
    document.getElementById('interestRateDisplay').textContent = value;
    calculateEMI();
}

// Toggle details section
document.addEventListener('DOMContentLoaded', function() {
    const detailsToggle = document.getElementById('detailsToggle');
    const detailsSection = document.getElementById('detailsSection');
    
    detailsToggle.addEventListener('click', function(e) {
        e.preventDefault();
        detailsSection.classList.toggle('show');
        
        if (detailsSection.classList.contains('show')) {
            detailsToggle.innerHTML = '<i class="fas fa-times-circle"></i> Hide Details';
        } else {
            detailsToggle.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
        }
    });
    
    // Animations for talk to expert button
    const expertButton = document.querySelector('.talk-to-expert');
    
    expertButton.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-headset"></i> Talk To Our Loan Expert';
            }, 2000);
        }, 1500);
    });

    // Initialize calculations on page load
    calculateEMI();
    
    // Add some entrance animations with slight delays
    const elements = [
        document.querySelector('.header'),
        document.querySelector('.left'),
        document.querySelector('.right')
    ];
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add ripple effect to sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.parentElement.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });
});

// Add random floating financial icons in the background with animation
function addFloatingIcons() {
    const container = document.querySelector('.container');
    const icons = ['fa-money-bill-wave', 'fa-coins', 'fa-chart-line', 'fa-home', 'fa-piggy-bank', 'fa-percentage'];
    
    for (let i = 0; i < 8; i++) {
        const icon = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        icon.className = `fas ${randomIcon} floating-icon`;
        
        // Random position and animation duration
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDuration = `${Math.random() * 10 + 5}s`;
        icon.style.opacity = '0.1';
        icon.style.color = '#1976d2';
        icon.style.fontSize = `${Math.random() * 20 + 10}px`;
        
        container.appendChild(icon);
    }
}

// Call function after page load with delay
setTimeout(addFloatingIcons, 1000);

// Add subtle parallax effect
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const depthFactor = 20;
    
    const elements = [
        { el: document.querySelector('.header'), factor: 3 },
        { el: document.querySelector('.left'), factor: 5 },
        { el: document.querySelector('.right'), factor: 8 }
    ];
    
    elements.forEach(item => {
        if (item.el) {
            item.el.style.transform = `translate(${mouseX * item.factor}px, ${mouseY * item.factor}px)`;
        }
    });
});