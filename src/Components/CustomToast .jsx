// API
import api from "../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";

const CustomToast = ({ closeToast }) => {
  // Cookie
  const [cookies, setCookie] = useCookies(["token"]);

  const resendEmail = async () => {
    try {
      const res = await api.post(
        `api/resend-verify-email`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
            .resendButton {
              border: none;
              background-color: transparent;
              color: #0d6efd;
              cursor: pointer;
              font-size: 16px
            }
            .resendButton:hover {
              color: #0b5ed7;
            }
          `}
      </style>

      <div style={{ cursor: "auto" }}>
        Please confirm your email address ,or&nbsp;
        <button
          className="resendButton"
          onClick={() => {
            // Resend email logic here
            resendEmail();
            closeToast(); // Close the toast notification
          }}
        >
           request
        </button>{" "}
        a new verification.
      </div>
    </>
  );
};

export default CustomToast;
