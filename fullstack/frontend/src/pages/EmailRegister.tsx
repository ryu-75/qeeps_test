import { Component, ReactNode } from "react";
import EmailInput from "../components/EmailInput";
import OtpInput from "../components/OtpInput";
import axios from "axios";

/*
  - submitted: Indique si le formulaire a été soumis.
  - email: Représente l'e-mail saisi par le client.
  - code: Représente le nouveau code OTP saisi par le client.
  - otp: Représente le code OTP saisi par le client.
  - error: Représente le message d'erreur à afficher.
*/
interface EmailRegisterState {
  submitted: boolean;
  email: string;
  code: string[];
  otp: string;
  error: string;
}

class EmailRegister extends Component<Record<string, never>, EmailRegisterState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      submitted: false,
      email: "",
      code: Array(5).fill(''),
      otp: "",
      error: ""
    };
  }

  /* 
    Redéfinis submitted à "false" si handleBack est appelé
    On retourne ce composant
  */
  handleBack = () => {
    this.setState({ submitted: false });
  };

  /* Vérifie si le formatage de l'e-mail est correct */
  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };
  
  /* 
    Gère la soumission du formulaire d'envoi OTP :
    - Vérifie d'abord si l'email est valide.
    - Envoie une requête POST à l'API pour envoyer l'OTP à l'email spécifié.
    - Gère les réponses de l'API, met à jour l'état en conséquence et affiche une alerte en cas d'erreur.
  */
  handleSubmit = async (email: string) => {
    if (!this.validateEmail(email)) {
      this.setState({ error: "Veuillez entrer une adresse e-mail valide." });
      throw new Error("Veuillez entrer une adresse e-mail valide.");
    }

    try {
      const { code } = this.state;

      this.setState({ submitted: true, email });

      const response = await axios.post('http://localhost:3000/otp/send-otp', {
        email, 
        otp: code.join(''),
      }, { headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        const errorData = await response.data;
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.data;
      this.setState({ otp: data.otp });
      alert('OTP sent successfully');
    } catch (e: unknown) {
      if (e instanceof Error) console.error("Error sending OTP: ", e.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  /* 
    En fonction de l'état de submitted, l'un des deux composants est défini: 
    - OtpInput si le mail est correctement rentrée et validé
    - EmailInput, attend un mail valide en entrée
  */
  render(): ReactNode {
    const { submitted, email, code, otp, error } = this.state;
    return (
      <div>
        {!submitted ? (
          <EmailInput onSubmit={this.handleSubmit} error={error} />
        ) : (
          <OtpInput refetchOtp={this.handleSubmit} email={email} code={code} otp={otp} onBack={this.handleBack}/>
        )}
      </div>
    );
  }
}

export default EmailRegister;
