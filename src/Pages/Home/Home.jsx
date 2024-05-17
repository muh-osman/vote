// SASS
import style from "./Home.module.scss";
// React
import { useState, useEffect } from "react";
// Logo
import leftLogo from "../../Assets/Images/logo-left.jpg";
import rightLogo from "../../Assets/Images/logo-right.jpg";
// Images
import A from "../../Assets/Images/المتوحش.webp";
import B from "../../Assets/Images/باهار.webp";
import C from "../../Assets/Images/ع أمل.webp";
import D from "../../Assets/Images/لعبة حب.webp";
import E from "../../Assets/Images/ما فيي.webp";

export default function Home() {
  // const [ip, setIp] = useState("");

  // useEffect(() => {
  //   fetch("https://api.ipify.org?format=json")
  //     .then((response) => response.json())
  //     .then((data) => setIp(data.ip))
  //     .catch((error) => console.error("Error fetching IP:", error));
  // }, []);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // هنا يمكنك إضافة الكود لإرسال البيانات إلى الخادم
    console.log("الخيار المختار:", selectedOption);
    console.log("الاسم:", name);
    console.log("رقم الهاتف:", phoneNumber);
  };

  return (
    <div className={style.container}>
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
                المتوحش
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
                باهار
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
                ع أمل
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
                لعبة حب
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
                ما فيي
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
            <input
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
              dir="ltr"
              type="number"
              name="number"
              id="phone-number"
              required
            />

            <button>صوت الآن !</button>
          </div>
        </form>
      </div>

      <footer>
        جميع الحقوق محفوظة © مهرجان الخليج للإذاعة والتلفزيون 2024
      </footer>
    </div>
  );
}
