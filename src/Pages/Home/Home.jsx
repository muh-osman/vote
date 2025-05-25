// SASS
import style from "./Home.module.scss";
// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Logo
import leftLogo from "../../Assets/Images/logo-left.png";
import rightLogo from "../../Assets/Images/Minstry.png";
// Images
import A1 from "../../Assets/Images/series/1.jpg";
import A2 from "../../Assets/Images/series/2.jpg";
import A3 from "../../Assets/Images/series/3.jpg";
import A4 from "../../Assets/Images/series/4.jpg";
import A5 from "../../Assets/Images/series/5.jpg";
import A6 from "../../Assets/Images/series/6.jpg";
import A7 from "../../Assets/Images/series/7.jpeg";
import A8 from "../../Assets/Images/series/8.jpg";
import A9 from "../../Assets/Images/series/9.jpg";
import A10 from "../../Assets/Images/series/10.jpg";
import A11 from "../../Assets/Images/series/11.jpg";

import B1 from "../../Assets/Images/maleActors/1.jpg";
import B2 from "../../Assets/Images/maleActors/2.jpg";
import B3 from "../../Assets/Images/maleActors/3.jpg";
import B4 from "../../Assets/Images/maleActors/4.jpg";
import B5 from "../../Assets/Images/maleActors/5.jpg";
import B6 from "../../Assets/Images/maleActors/6.jpg";
import B7 from "../../Assets/Images/maleActors/7.jpg";
import B8 from "../../Assets/Images/maleActors/8.jpg";
import B9 from "../../Assets/Images/maleActors/9.jpg";
import B10 from "../../Assets/Images/maleActors/10.jpg";

import C1 from "../../Assets/Images/femaleActors/1.jpg";
import C2 from "../../Assets/Images/femaleActors/2.jpg";
import C3 from "../../Assets/Images/femaleActors/3.jpg";
import C4 from "../../Assets/Images/femaleActors/4.jpg";
import C5 from "../../Assets/Images/femaleActors/5.jpg";
import C6 from "../../Assets/Images/femaleActors/6.jpg";
import C7 from "../../Assets/Images/femaleActors/7.jpg";
import C8 from "../../Assets/Images/femaleActors/8.jpg";
import C9 from "../../Assets/Images/femaleActors/9.jpg";

// import arc from "../../Assets/Images/arc.png";

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
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedMaleActor, setSelectedMaleActor] = useState(null);
  const [selectedFemaleActor, setSelectedFemaleActor] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch from ipapi.co with status ${response.status}`
          );
        }
        const data = await response.json();
        setIp(data.ip);
        setCountryCode(data.country_code);
      } catch (error) {
        console.error("Error fetching IP from ipapi.co:", error);
        // Fallback to ipinfo.io
        try {
          // Blocked in syria
          const response = await fetch(
            "https://ipinfo.io/json?token=3215c7cb6b3df7"
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch from ipinfo.io with status ${response.status}`
            );
          }
          const jsonResponse = await response.json();
          setIp(jsonResponse.ip);
          setCountryCode(jsonResponse.country); // Assuming country code exists in ipinfo.io response
        } catch (error) {
          console.error("Error fetching IP fallback from ipinfo.io:", error);
        }
      }
    };

    fetchData();
  }, []);

  //
  const handleSeriesChange = (option) => {
    setSelectedSeries(option);
  };

  const handleMaleActorChange = (actor) => {
    setSelectedMaleActor(actor);
  };
  const handleFemaleActorChange = (actor) => {
    setSelectedFemaleActor(actor);
  };
  //

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (cookies.isVoted || window.localStorage.getItem("isVoted")) {
    //   toast.warn("عذراً .. لقد قمت بالتصويت مسبقاً.");
    //   return;
    // }

    if (!selectedSeries || !selectedMaleActor || !selectedFemaleActor) {
      toast.warn("يرجى اختيار مرشح لكل فئة.");
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
      const res = await api.post(`http://localhost:8000/api/vote`, {
        name: name,
        phone: phoneNumber,
        series_id: selectedSeries,
        male_actor_id: selectedMaleActor,
        female_actor_id: selectedFemaleActor,
        ip_address: ip,
      });

      // console.log(selectedSeries);
      // console.log(selectedMaleActor);
      // console.log(selectedFemaleActor);

      // console.log(ip);

      // console.log(name);
      // console.log(phoneNumber);

      // console.log(res);
      // setLoading(false);
      // document.getElementById("overlay").style.height = "100vh";
      // document.querySelector("html").classList.add("stop-scrolling");
      window.localStorage.setItem("isVoted", "true");
      setCookie("isVoted", "true");

      navigate("/thankyou", { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.warn("عذراً .. لقد قمت بالتصويت مسبقاً.");
    }
  };

  // Movie options array
  const series = [
    { value: "1", label: "عابر سبيل", image: A1 },
    { value: "2", label: "وحوش", image: A2 },
    { value: "3", label: "البوم", image: A3 },
    { value: "4", label: "المسار", image: A4 },
    { value: "5", label: "شارع الاعشى", image: A5 },
    { value: "6", label: "سدف", image: A6 },
    { value: "7", label: "ليالي الشميسي", image: A7 },
    { value: "8", label: "يوميات رجال عانس", image: A8 },
    { value: "9", label: "كائنات", image: A9 },
    { value: "10", label: "أفكار امي", image: A10 },
    { value: "11", label: "ام 44", image: A11 },
  ];

  // Movie options array
  const maleActors = [
    {
      value: "1",
      label: "إبراهيم الحجاج",
      sub: "مسلسل يوميات رجل عانس",
      image: B1,
    },
    { value: "2", label: "أحمد النجار", sub: "مسلسل باب السين", image: B2 },
    { value: "3", label: "حسين الحداد", sub: "مسلسل أفكار أمي", image: B3 },
    { value: "4", label: "خالد صقر", sub: "مسلسل شارع الأعشى", image: B4 },
    { value: "5", label: "عبدالله بوشهري", sub: "مسلسل عابر سبيل", image: B5 },
    {
      value: "6",
      label: "عبدالمحسن النمر",
      sub: "مسلسل عابر سبيل",
      image: B6,
    },
    { value: "7", label: "علي كاكولي", sub: "مسلسل وحوش", image: B7 },
    { value: "8", label: "فيصل العميري", sub: "مسلسل وحوش", image: B8 },
    { value: "9", label: "محمد المنصور", sub: "مسلسل المسار", image: B9 },
    { value: "10", label: "محمد ميرزا", sub: "مسلسل الفاشنيست", image: B10 },
  ];

  // Movie options array
  const femaleActors = [
    { value: "1", label: "الهام الفضالة", sub: "مسلسل بيت حمولة", image: C1 },
    {
      value: "2",
      label: "بيبي العبدالمحسن",
      sub: "مسلسل الفاشنيستا",
      image: C2,
    },
    {
      value: "3",
      label: "ريم ارحمه",
      sub: "مسلسسل البث (خاطف من نوع أخر)",
      image: C3,
    },
    {
      value: "4",
      label: "ريم عبدالله",
      sub: "مسلسل ليالي الشميسي",
      image: C4,
    },
    { value: "5", label: "شجون", sub: "مسلسل وحوش", image: C5 },
    {
      value: "6",
      label: "فاطمة الشريف",
      sub: "مسلسل يوميات رجل عانس",
      image: C6,
    },
    { value: "7", label: "ليلى عبدالله", sub: "مسلسل عابر سبيل", image: C7 },
    { value: "8", label: "هبة الدري", sub: "مسلسل أبو البنات", image: C8 },
    { value: "9", label: "وفاء عامر", sub: "مسلسل عابر سبيل", image: C9 },
  ];

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
        <div className={style.right_logo}>
          <img src={rightLogo} alt="logo" />
        </div>
        <div className={style.left_logo}>
          <img src={leftLogo} alt="logo" />
        </div>
      </nav>

      <h1 className={style.website_title}>
        جائزة الدانة للدراما | تصويت الجمهور
      </h1>

      <p dir="rtl">
        يسرنا دعوتكم للمشاركة في{" "}
        <span style={{ fontWeight: 900 }}>جائزة تصويت الجمهور</span> ضمن النسخة
        الثانية من <span style={{ fontWeight: 900 }}>جائزة الدانة للدراما</span>{" "}
        حيث تتيح لكم هذه الجائزة فرصة اختيار أفضل مسلسل، أفضل ممثل، وأفضل ممثلة
        من بين المرشحين.
      </p>

      <div className={style.form_box}>
        <form onSubmit={handleSubmit}>
          <h4>أفضل مسلسل</h4>
          <div className={style.label_box}>
            {series.map((option) => (
              <label key={option.value} dir="rtl">
                <div
                  className={`${style.image_box} ${
                    selectedSeries === option.value ? "activeInput" : ""
                  }`}
                  onClick={() => handleSeriesChange(option.value)}
                >
                  <img src={option.image} alt={`Option ${option.value}`} />
                </div>
                <div className={style.label_text_box}>
                  <input
                    type="radio"
                    name="options"
                    value={option.value}
                    checked={selectedSeries === option.value}
                    onChange={() => handleSeriesChange(option.value)}
                    className={style.hiddenRadio}
                  />
                  {option.label}
                </div>
              </label>
            ))}
          </div>

          {/* <div style={{ height: "50px" }}>
            <img style={{ width: "100%" }} src={arc} alt="arc" />
          </div> */}

          <h4>أفضل ممثل</h4>
          {/* put maleActors here */}
          <div className={style.label_box}>
            {maleActors.map((actor) => (
              <label key={actor.value} dir="rtl">
                <div
                  className={`${style.image_box} ${
                    selectedMaleActor === actor.value ? "activeInput" : ""
                  }`}
                  onClick={() => handleMaleActorChange(actor.value)}
                >
                  <img src={actor.image} alt={`Actor ${actor.value}`} />
                </div>
                <div className={style.label_text_box}>
                  <input
                    type="radio"
                    name="maleActors"
                    value={actor.value}
                    checked={selectedMaleActor === actor.value}
                    onChange={() => handleMaleActorChange(actor.value)}
                    className={style.hiddenRadio} // Add this class
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{actor.label}</div>
                    <div className={style.sub}>{actor.sub}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <h4>أفضل ممثلة</h4>
          {/* put femaleActors here */}
          <div className={style.label_box}>
            {femaleActors.map((actor) => (
              <label key={actor.value} dir="rtl">
                <div
                  className={`${style.image_box} ${
                    selectedFemaleActor === actor.value ? "activeInput" : ""
                  }`}
                  onClick={() => handleFemaleActorChange(actor.value)}
                >
                  <img src={actor.image} alt={`Actor ${actor.value}`} />
                </div>
                <div className={style.label_text_box}>
                  <input
                    type="radio"
                    name="femaleActors"
                    value={actor.value}
                    checked={selectedFemaleActor === actor.value}
                    onChange={() => handleFemaleActorChange(actor.value)}
                    className={style.hiddenRadio} // Add this class
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{actor.label}</div>
                    <div className={style.sub}>{actor.sub}</div>
                  </div>
                </div>
              </label>
            ))}
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

      <footer>جميع الحقوق محفوظة © جائزة الدانة للدراما 2025</footer>

      {/* <div className={style.overlay} id="overlay">
        <div>
          <h1>شكرا</h1>
          <h2>لمشاركتك في التصويت</h2>
        </div>
        <img className={style.big} src={overlay} alt="overlay" />
      </div> */}
    </div>
  );
}
