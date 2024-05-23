// SASS
import style from "./Home.module.scss";
// React
import { useState, useEffect } from "react";
// Logo
import leftLogo from "../../Assets/Images/logo-left.jpg";
import rightLogo from "../../Assets/Images/logo-right.jpg";
// Images
import A from "../../Assets/Images/a.jpg";
import B from "../../Assets/Images/b.jpg";
import C from "../../Assets/Images/c.jpg";
import D from "../../Assets/Images/d.jpg";
import E from "../../Assets/Images/e.jpg";
import F from "../../Assets/Images/f.jpg";
import G from "../../Assets/Images/g.jpeg";
import H from "../../Assets/Images/h.jpeg";
import I from "../../Assets/Images/i.jpeg";
import J from "../../Assets/Images/j.jpeg";
import overlay from "../../Assets/Images/background.jpg";
// API
import api from "../../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

export default function Home() {
  const [cookies, setCookie] = useCookies(["isVoted"]);

  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip);
        setCountryCode(data.country_code);
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cookies.isVoted || window.localStorage.getItem("isVoted")) {
      toast.warn("عذراً .. لقد قمت بالتصويت مسبقاً.");
      return;
    }

    if (name.length < 3) {
      toast.warn("أدخل اسم صالح.");
      return;
    }

    if (!isPossiblePhoneNumber(phoneNumber)) {
      toast.warn("أدخل رقم هاتف صالح.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`api/voters`, {
        internet_protocol: ip,
        name: name,
        phone_number: phoneNumber,
        vote: selectedOption,
      });

      // console.log(res);
      // setLoading(false);
      document.getElementById("overlay").style.height = "100vh";
      document.querySelector("html").classList.add("stop-scrolling");
      window.localStorage.setItem("isVoted", "true");
      setCookie("isVoted", "true");
    } catch (err) {
      console.error(err);
      setLoading(false);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.warn("عذراً .. لقد قمت بالتصويت مسبقاً.");
    }
  };

  return (
    <div className={style.container}>
      {/* Start Toastify */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* End Toastify */}
      <nav>
        <div className={style.left_logo}>
          <img src={leftLogo} alt="logo" />
        </div>
        <div className={style.right_logo}>
          <img src={rightLogo} alt="logo" />
        </div>
      </nav>

      <h4>جائزة تصويت الجمهور</h4>
      <p dir="rtl">
        ندعوكم للمشاركة في جائزة تصويت الجمهور لجائرة الدانة للدراما ضمن مهرجان
        الخليج للإذاعة والتلفزيون في دورته السادسة عشرة! تمنحكم هذه الجائزة فرصة
        اختيار عملكم المفضل من بين مجموعة من الأعمال المرشحة للفوز بالجائزة.
      </p>

      <div className={style.form_box}>
        <form onSubmit={handleSubmit}>
          <div className={style.label_box}>
            {/* 1 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "1" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("1")}
              >
                <img src={A} alt="Option 1" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={() => handleOptionChange("1")}
                  required
                />
                البوم
              </div>
            </label>

            {/* 2 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "2" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("2")}
              >
                <img src={B} alt="Option 2" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={() => handleOptionChange("2")}
                  required
                />
                ثانوية النسيم
              </div>
            </label>

            {/* 3 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "3" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("3")}
              >
                <img src={C} alt="Option 3" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="3"
                  checked={selectedOption === "3"}
                  onChange={() => handleOptionChange("3")}
                  required
                />
                الخن
              </div>
            </label>

            {/* 4 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "4" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("4")}
              >
                <img src={D} alt="Option 4" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="4"
                  checked={selectedOption === "4"}
                  onChange={() => handleOptionChange("4")}
                  required
                />
                سكة سفر 3
              </div>
            </label>

            {/* 5 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "5" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("5")}
              >
                <img src={E} alt="Option 5" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="5"
                  checked={selectedOption === "5"}
                  onChange={() => handleOptionChange("5")}
                  required
                />
                خيوط المعازيب
              </div>
            </label>

            {/* 6 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "6" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("6")}
              >
                <img src={F} alt="Option 6" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="6"
                  checked={selectedOption === "6"}
                  onChange={() => handleOptionChange("6")}
                  required
                />
                رمضان شريف
              </div>
            </label>

            {/* 7 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "7" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("7")}
              >
                <img src={G} alt="Option 7" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="7"
                  checked={selectedOption === "7"}
                  onChange={() => handleOptionChange("7")}
                  required
                />
                الشرار
              </div>
            </label>

            {/* 8 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "8" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("8")}
              >
                <img src={H} alt="Option 8" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="8"
                  checked={selectedOption === "8"}
                  onChange={() => handleOptionChange("8")}
                  required
                />
                بيت أبونا
              </div>
            </label>

            {/* 9 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "9" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("9")}
              >
                <img src={I} alt="Option 9" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="9"
                  checked={selectedOption === "9"}
                  onChange={() => handleOptionChange("9")}
                  required
                />
                سندس ٢
              </div>
            </label>

            {/* 10 */}
            <label dir="rtl">
              <div
                className={`${style.image_box} ${
                  selectedOption === "10" ? "activeInput" : ""
                }`}
                onClick={() => handleOptionChange("10")}
              >
                <img src={J} alt="Option 10" />
              </div>
              <div className={style.label_text_box}>
                <input
                  type="radio"
                  name="options"
                  value="10"
                  checked={selectedOption === "10"}
                  onChange={() => handleOptionChange("10")}
                  required
                />
                كلاود كيتشن
              </div>
            </label>
          </div>

          <div dir="rtl" className={style.name_and_phnone_box}>
            <h2>معلومات المشارك في التصويت</h2>
            <label htmlFor="name">الأسم الثلاثي</label>
            <input
              onChange={handleNameChange}
              value={name}
              dir="auto"
              type="text"
              name="name"
              id="name"
              required
            />

            <label htmlFor="phone-number">رقم الهاتف</label>
            {/* <input
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
              dir="ltr"
              type="tel"
              name="number"
              id="phone-number"
              required
            /> */}

            <div dir="ltr" className={style.phone_box}>
              <PhoneInput
                international
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry={countryCode}
              />
            </div>

            <button disabled={loading}>
              صوت الآن !
              {/* {loading ? <span className="loaderBtn"></span> : "صوت الآن !"} */}
            </button>
          </div>
        </form>
      </div>

      <footer>
        جميع الحقوق محفوظة © مهرجان الخليج للإذاعة والتلفزيون 2024
      </footer>

      <div className={style.overlay} id="overlay">
        <div>
          <h1>شكرا</h1>
          <h2>لمشاركتك في التصويت</h2>
        </div>
        <img className={style.big} src={overlay} alt="overlay" />
      </div>
    </div>
  );
}
