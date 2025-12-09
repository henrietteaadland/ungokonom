document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop page refresh

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btn = document.querySelector('.login-btn');
  const originalText = btn.innerText;

  if(email && password) {
    // 1. Change button to loading state (Norwegian)
    btn.innerText = 'LOGGER INN...';
    btn.style.backgroundColor = '#00C1A3'; // Teal accent
    
    // 2. Simulate server delay
    setTimeout(() => {
      alert(`Velkommen til Ung Økonom, ${email}!`);
      
      // 3. Reset button
      btn.innerText = originalText;
      btn.style.backgroundColor = ''; 
      
      // Here you would normally redirect: window.location.href = '/dashboard';
    }, 1500);
  }
});
