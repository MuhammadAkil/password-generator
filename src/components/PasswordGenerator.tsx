import React, { useState, useRef } from "react";
import { Input, Button, Slider, Checkbox, Typography, Space, message } from "antd";
import { CopyOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PasswordGenerator: React.FC = () => {
	const [length, setLength] = useState<number>(12);
	const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
	const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	const generatePassword = () => {
		const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";
		const symbols = "!@#$%^&*()_+{}[]<>?";
		let characters = letters;

		if (includeNumbers) characters += numbers;
		if (includeSymbols) characters += symbols;

		let newPassword = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			newPassword += characters[randomIndex];
		}

		setPassword(newPassword);
	};

	const copyToClipboard = () => {
		if (inputRef.current) {
			navigator.clipboard.writeText(password);
			message.success("Password copied to clipboard!");
		}
	};

	return (
		<div style={styles.container}>
			<Title level={3} style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>
				<LockOutlined /> Password Generator
			</Title>

			<Space.Compact style={{ width: "100%" }}>
				<Input ref={inputRef as any} value={password} readOnly placeholder="Generated Password" style={styles.input} />
				<Button style={{ paddingBlock: "20px" }} type="primary" icon={<CopyOutlined />} onClick={copyToClipboard}>
					Copy
				</Button>
			</Space.Compact>

			<div style={styles.sliderContainer}>
				<Slider min={6} max={30} value={length} onChange={setLength} />
				<span style={styles.label}>Length: {length}</span>
			</div>

			<div style={styles.checkboxContainer}>
				<Checkbox style={{ color: "white" }} checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)}>
					Include Numbers
				</Checkbox>
				<Checkbox style={{ color: "white" }} checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)}>
					Include Special Characters
				</Checkbox>
			</div>

			<Button type="primary" block onClick={generatePassword} style={styles.generateButton}>
				Generate Password
			</Button>
		</div>
	);
};

const styles: Record<string, React.CSSProperties> = {
	container: {
		width: "400px",
		margin: "50px auto",
		padding: "20px",
		background: "#1a1a2e",
		color: "#fff",
		textAlign: "center",
		borderRadius: "10px",
	},
	input: {
		fontSize: "16px",
	},
	sliderContainer: {
		margin: "15px 0",
	},
	label: {
		color: "orange",
		fontSize: "16px",
	},
	checkboxContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		gap: "8px",
		marginBottom: "15px",
	},
	generateButton: {
		background: "#1890ff",
		color: "#fff",
		fontSize: "16px",
	},
};

export default PasswordGenerator;
