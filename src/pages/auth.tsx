import { useState } from "react";
import { Loading } from "../components/loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AuthScreen() {
  const [selectedAuthOption, setSelectedAuthOption] = useState("phone-number");
  const [authValue, setAuthValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const navigate = useNavigate();

  const handleGetOtpValue = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setOtpValue("450420");
        setLoading(true);
      }, 2000);
    } catch (error) {}
  };

  const validateOtpValue = () => {
    if (Number(authValue) !== Number(otpValue))
      return toast.error("Please provide a valid otp value.");
    navigate("/create");
  };

  return (
    <div className='container-fluid auth-container'>
      <div className='row'>
        <div className='col-6 left'></div>
        <div className='col-6 right'>
          <div className='auth-card'>
            <div className='auth-options'>
              <li
                className={
                  selectedAuthOption === "phone-number" ? "active" : ""
                }
                onClick={() => setSelectedAuthOption("phone-number")}
              >
                Phone Number{" "}
              </li>
              <li
                className={selectedAuthOption === "email" ? "active" : ""}
                onClick={() => setSelectedAuthOption("email")}
              >
                Email
              </li>
            </div>
            <div className='auth-body'>
              {otpValue ? (
                <div>
                  <label>
                    Confirm your access with the code that has been sent to your{" "}
                    {selectedAuthOption}
                  </label>
                  <input
                    placeholder='xxxxxx'
                    className='form-control'
                    onChange={({ target: { value } }) => setAuthValue(value)}
                  />
                </div>
              ) : selectedAuthOption === "email" ? (
                <div>
                  <label>Enter your Email Address</label>
                  <input
                    placeholder='johndoe@email.com'
                    className='form-control'
                  />
                </div>
              ) : (
                <div>
                  <label>Enter your phone number</label>
                  <input placeholder='080XXXXXXXX' className='form-control' />
                </div>
              )}
              {!otpValue ? (
                <button
                  className='verify-btn'
                  onClick={handleGetOtpValue}
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Validate Me!"}
                </button>
              ) : (
                <>
                  <p className='resend-code'>
                    Resend code in <span>01:00</span>
                  </p>
                  <button
                    className='verify-btn'
                    onClick={validateOtpValue}
                    disabled={!authValue.length}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
