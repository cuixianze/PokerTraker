import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navBar.css";
import axios from "axios";
import Modal from "./modal";

function Navbar() {
  //navBar 수정 -> 우측 토글
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  //여기부터 로그인 팝업
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버로 ID와 PW 전송 (서버 URL은 실제 서버 주소로 변경)
      const response = await axios.post("#", {
        id,
        password,
      });

      // 로그인 성공 시 서버 응답을 통해 권한 확인
      if (
        response.data.status === "success" &&
        response.data.role === "admin"
      ) {
        localStorage.setItem("role", "admin");
      } else {
        setError("Invalid credentials or not an admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
    }
  };
  /*
    json 응답 예시
    "status": "success", // 로그인 성공 여부
    "role": "admin"      // 관리자 권한 (admin, user 등)
  */
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <nav className="navBar">
      <div className="navBar_container">
        {/* 로고, 웹 이름 */}
        <div className="navBar_title">
          <div className="navBar_logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60px"
              height="60px"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M150.156 82.406a18.2 18.2 0 0 0-5.344 1.063L41.094 121.53c-4.483 1.645-8.493 5.357-10.5 9.69c-2.007 4.33-2.238 9.798-.594 14.28l66.72 181.875c1.643 4.482 5.354 8.524 9.686 10.53c4.332 2.008 9.8 2.24 14.28.595l103.72-38.063c4.483-1.644 8.493-5.355 10.5-9.687l.03-.063c1.982-4.322 2.2-9.757.564-14.218L168.78 94.593c-1.635-4.46-5.318-8.484-9.624-10.5l-.062-.03c-2.166-1.005-4.623-1.556-7.094-1.658c-.618-.025-1.23-.03-1.844 0zM189.22 96.03l63.843 174a37.44 37.44 0 0 1-1.188 28.595A37.38 37.38 0 0 1 230.845 318l-27.44 10.063l60 2.78c4.77.223 9.91-1.66 13.44-4.874c3.528-3.217 5.87-8.17 6.092-12.94l9-193.5c.222-4.768-1.628-9.938-4.843-13.468c-3.216-3.53-8.168-5.87-12.938-6.093l-84.937-3.94zm121 33.25l-8.626 184.626a37.43 37.43 0 0 1-12.156 25.906a37.4 37.4 0 0 1-26.907 9.688l-26.06-1.22l69.374 23.095c4.53 1.507 10.012 1.107 14.28-1.03c4.27-2.14 7.838-6.283 9.345-10.814l61.155-183.81c1.507-4.532 1.107-10.013-1.03-14.282c-2.14-4.27-6.283-7.87-10.814-9.375l-68.56-22.782zm-205.064 18.345c24.458 24.936 68.02 17.74 80.75 45.53c11.875 25.927-14.51 46.006-37.97 38.407l17 30.782l-18.78 6.906l-10.937-31.688c-10.39 22.624-43.053 23.746-54.157-.53c-13.53-29.577 24.02-54.2 24.093-89.407zm301.438 39.22L347.22 365.437a37.4 37.4 0 0 1-18.72 21.625l-.094.03a37.38 37.38 0 0 1-28.437 2l-20.376-6.78l43.312 37.03c3.63 3.102 8.865 4.78 13.625 4.407s9.618-2.84 12.72-6.47l125.875-147.31c3.102-3.63 4.78-8.835 4.406-13.595c-.372-4.76-2.87-9.648-6.5-12.75l-66.436-56.78z"
              ></path>
            </svg>
          </div>
          <div className="navBar_webName">Poker Tracker</div>
        </div>
        {/* navBar 페이지 */}
        <ul className={`navBar_list ${isMenuOpen ? "menu-open" : ""}`}>
          <li>
            <Link to="/" className="navBar_menu">
              Home
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="navBar_menu">
              User Leaderboard
            </Link>
          </li>
          <li className="navBar_menu_li">
            <Link to="/create-user" className="navBar_menu_b">
              Create User
            </Link>
          </li>
          <li className="navBar_menu_li">
            <Link to="/create-game" className="navBar_menu_b">
              Create Game
            </Link>
          </li>
        </ul>
        {/* 햄버거 메뉴 아이콘 */}
        <button className="hamburger-icon" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`sidebar-menu ${isMenuOpen ? "menu-open" : ""}`}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/leaderboard">User Leaderboard</a>
            </li>
            <li>
              <a href="/create-user">Create User</a>
            </li>
            <li>
              <a href="/create-game">Create Game</a>
            </li>
          </ul>
        </div>
        <div className="navBar_space">
          <button className="logIn" onClick={openModal}>
            Admin
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>관리자 로그인</legend>
                <div>
                  <label htmlFor="id">ID</label>
                  <input
                    type="text"
                    placeholder="아이디 입력"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  ></input>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <div>
                  <button type="submit">로그인</button>
                </div>
              </fieldset>
            </form>
          </Modal>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
