// SASS
import style from "./Home.module.scss";
// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Logo
import leftLogo from "../../Assets/Images/logo-left.png";
import rightLogo from "../../Assets/Images/Minstry.png";
// Images
// import A from "../../Assets/Images/a.jpg";
// import B from "../../Assets/Images/b.jpg";
// import C from "../../Assets/Images/c.jpg";
// import D from "../../Assets/Images/d.jpg";
// import E from "../../Assets/Images/e.jpg";
// import F from "../../Assets/Images/f.jpg";
import zxc from "../../Assets/Images/zxc.jpg";

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

      console.log(selectedSeries);
      console.log(selectedMaleActor);
      console.log(selectedFemaleActor);

      console.log(ip);

      console.log(name);
      console.log(phoneNumber);

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
    { value: "1", label: "الدانة للدراما", image: zxc },
    { value: "2", label: "الدانة للدراما", image: zxc },
    { value: "3", label: "الدانة للدراما", image: zxc },
    { value: "4", label: "الدانة للدراما", image: zxc },
    { value: "5", label: "الدانة للدراما", image: zxc },
    { value: "6", label: "الدانة للدراما", image: zxc },
  ];

  // Movie options array
  const maleActors = [
    { value: "1", label: "الدانة للدراما", image: zxc },
    { value: "2", label: "الدانة للدراما", image: zxc },
    { value: "3", label: "الدانة للدراما", image: zxc },
    { value: "4", label: "الدانة للدراما", image: zxc },
    { value: "5", label: "الدانة للدراما", image: zxc },
    { value: "6", label: "الدانة للدراما", image: zxc },
  ];

  // Movie options array
  const femaleActors = [
    { value: "1", label: "الدانة للدراما", image: zxc },
    { value: "2", label: "الدانة للدراما", image: zxc },
    { value: "3", label: "الدانة للدراما", image: zxc },
    { value: "4", label: "الدانة للدراما", image: zxc },
    { value: "5", label: "الدانة للدراما", image: zxc },
    { value: "6", label: "الدانة للدراما", image: zxc },
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

      <h1 className={style.website_title}>جائزة الدانة للدراما | تصويت الجمهور</h1>

      <p dir="rtl">
        يسرنا دعوتكم للمشاركة في{" "}
        <span style={{ fontWeight: 900 }}>جائزة تصويت الجمهور</span> ضمن النسخة
        الثانية من <span style={{ fontWeight: 900 }}>جائزة الدانة للدراما</span>{" "}
        حيث تتيح لكم هذه الجائزة فرصة اختيار أفضل مسلسل، أفضل ممثل، وأفضل ممثلة من بين
        المرشحين.
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
                    required
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
                    required
                  />
                  {actor.label}
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
                    required
                  />
                  {actor.label}
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
