import React, { useState } from "react";
import { ValidateEmail } from "../../utils/helper";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import NewPasswordUI from "../../components/ui/NewPasswordUI";
import AuthLayout from "../../components/layouts/AuthLayout";
import EmailUI from "../../components/ui/EmailUI";
import CodeUI from "../../components/ui/CodeUI";
import Success from "../../components/ui/Success";

const ResetPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, setError } = useErrorHandler();

  const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    setStep(2);
  };

  const handleCheckEmail = () => {
    window.location.href = `mailto:${email}`;

    setStep(3);
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 character");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password must match Confirm Password");
      return;
    }

    setStep(4);
  };

  return (
    <AuthLayout isResetPassword={true}>
      {step === 1 && (
        <EmailUI
          email={email}
          setEmail={setEmail}
          error={error}
          handleRequestCode={handleRequestCode}
        />
      )}
      {step === 2 && (
        <CodeUI error={error} handleCheckEmail={handleCheckEmail} />
      )}
      {step === 3 && (
        <NewPasswordUI
          handleResetPassword={handleResetPassword}
          error={error}
          password={newPassword}
          setPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
      {step === 4 && <Success />}
    </AuthLayout>
  );
};
export default ResetPassword;
