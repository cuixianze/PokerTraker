import React, { useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import Copyright from "../component/copyright";
import "../css/create.css";

function UserForm() {
  const [username, setUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      totalPnL: 0, // Set totalPnL to 0 by default
    };

    try {
      const response = await axios.post(
        "https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/create/user",
        userData
      );
      setResponseMessage(`User created: ${response.data.username}`);
      setUsername("");
    } catch (error) {
      setResponseMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="common">
      <Navbar />
      <div className="create_user_container">
        <div className="create_user">
          <div className="create_user_box">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="user_box_title">Create User:</label>
                <input
                  className="user_box_input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="user_box_button" disabled>
                Join Us
              </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        </div>
        <div className="create_user_rule">
          <div className="create_user_rule_box">
            <h1 className="rule_box_h1">필수 숙지 사항</h1>
            <h2 className="rule_box_h2">
              * 욕설 비방 자제 요망 * <br />
              신사다운 플레이🤵🏻‍♂
            </h2>
            <p className="rule_box_p1">
              ⚠ 뱅커 최현택 (부재시 자율선정) <br />
              🚸 뱅커 어드밴티지로 팁 4% 부여 <br />
              Ex) 10000바인시 10400원 입금 <br />
            </p>
            <p className="rule_box_p2">
              1. 블라인드 25/50 게임 [ 멘징 ❌ ] <br />
              2. 맥스 바이인 10000. <br />
              3. 바이인시 본인이름 기재 고정. <br />
              4. 애드온 10000원 이하로 가능. <br />
              5. 자리 비울시에 Away 꼭 누르기.
            </p>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
}

export default UserForm;
