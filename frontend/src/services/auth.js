// In a real app, this would be a proper authentication service.
// For this demo, we'll keep it simple but move the logic here.

export const login = async (username, password) => {
  // Simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'staff' && password === '1234') {
        resolve({ success: true, user: { name: 'Dr. Jane Doe', role: 'Cardiologist' } });
      } else {
        reject(new Error('Invalid credentials. Try staff/1234'));
      }
    }, 500);
  });
};
