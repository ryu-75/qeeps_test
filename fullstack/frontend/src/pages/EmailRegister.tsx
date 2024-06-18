import { Component, ReactNode } from "react";
import EmailInput from "../components/EmailInput";
import OtpInput from "../components/OtpInput";


interface EmailRegisterState {
  submitted: boolean;
  email: string;
  code: string[];
}

class EmailRegister extends Component<{}, EmailRegisterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      submitted: false,
      email: "",
      code: Array(5).fill(''),
    };
  }

  handleSubmit = (email: string) => {
      this.setState({ submitted: true, email })
  }

  handleResendCode = () => {
    this.setState({ submitted: false })
  }
  render(): ReactNode {
    const { submitted, email, code } = this.state;
    return (
      <div>
        {!submitted ? (
          <EmailInput onSubmit={this.handleSubmit} code={code} />
        ) : (
          <OtpInput fetchResendCode={this.handleResendCode} email={email} code={code} />
        )}
      </div>
    );
  }
}

export default EmailRegister;
