import { Component, ReactNode } from "react";
import EmailInput from "../components/EmailInput";
import OtpInput from "../components/OtpInput";


interface EmailRegisterState {
  submitted: boolean;
  email: string;
  code: string[];
  otp: string;
  error: string;
}

class EmailRegister extends Component<{}, EmailRegisterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      submitted: false,
      email: "",
      code: Array(5).fill(''),
      otp: "",
      error: ""
    };
  }

  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };
  
  handleSubmit = async (email: string) => {
    if (!this.validateEmail(email)) {
      this.setState({ error: "Veuillez entrer une adresse e-mail valide." });
      throw new Error("Veuillez entrer une adresse e-mail valide.");
    }

    try {
      const { code } = this.state;

      this.setState({ submitted: true, email });

      const response = await fetch('http://localhost:3000/otp/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: code.join('') }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.json();
      this.setState({ otp: data.otp });

      alert('OTP sent successfully');
    } catch (e: any) {
      console.error("Error sending OTP: ", e.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  render(): ReactNode {
    const { submitted, email, code, otp, error } = this.state;
    return (
      <div>
        {!submitted ? (
          <EmailInput onSubmit={this.handleSubmit} error={error} />
        ) : (
          <OtpInput refetchOtp={this.handleSubmit} email={email} code={code} otp={otp} />
        )}
      </div>
    );
  }
}

export default EmailRegister;
