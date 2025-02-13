import React from 'react';
import './App.css';
import PasswordGenerator from './components/PasswordGenerator.tsx';

function App() {
  return (
		<div className="App">
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0e0e1f" }}>
				<PasswordGenerator />
			</div>
		</div>
	);
}

export default App;
