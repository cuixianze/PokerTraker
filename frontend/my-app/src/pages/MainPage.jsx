import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import Copyright from "../component/copyright";
import SharkFish from "../component/SharkFish";
import TotalRake from "../component/TotalRake";
import GameList from "../component/GameList";
import "../css/main.css";

function MainPage() {
  const [sharkFishData, setSharkFishData] = useState(null);
  const [totalRake, setTotalRake] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data for Shark, Fish, and Total Rake
    axios
      .get(
        "https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/main/monthlyStats?month=2024-11"
      )
      .then((response) => {
        const data = response.data;
        setSharkFishData({
          shark: data.sharkOfMonth?.["username"] || "No Data",
          fish: data.fishOfMonth?.["username"] || "No Data",
        });
        setTotalRake(data.totalRakeForMonth || 0);
      })
      .catch((error) => setError(error.message));

    // Fetch paginated game list
    fetchGames(page);
  }, [page]);

  const fetchGames = (page) => {
    axios
      .get(
        "https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/main/games"
      )
      .then((response) => {
        setGameList(response.data.content || []);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => setError(error.message));
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="common">
      <Navbar />
      <div className="main_totalRake">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 32 32"
        >
          <g fill="none">
            <circle cx={16} cy={16} r={16} fill="#f1b32b"></circle>
            <path
              fill="#fff"
              d="M15.75 4C9.26 4 4 9.26 4 15.75S9.26 27.5 15.75 27.5S27.5 22.24 27.5 15.75A11.75 11.75 0 0 0 15.75 4m0 20.57a8.82 8.82 0 1 1 0-17.64a8.82 8.82 0 0 1 0 17.64m-2.93-8.81l2.94 4.4l2.92-4.4l-2.92-4.41z"
            ></path>
          </g>
        </svg>
        <TotalRake totalRake={totalRake} />
      </div>
      <div className="common_container">
        <div className="main_left">
          <GameList games={gameList} />
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
        <div className="main_right">
          <div className="main_spotlight">
            <div className="main_shark">
              <div className="main_spotlight_box">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="60px"
                  height="60px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="white"
                    d="M257.97 20.22C150.394 88.557 72.1 275.18 69.874 494.374h375.188c-2.2-219.194-79.52-405.817-187.094-474.156zm-18.845 163.06l18.344 36.282l18.342-36.28c9.99 2.326 19.72 6.537 29.063 12.437l4.156 48.56l20.095-28.624c7.938 8.123 15.48 17.558 22.594 28.156L345.436 279l18.375-15.344c24.39 44.295 42.05 103.6 49.532 170.78c-10.036-32.144-26.553-60.393-47.625-82.342l4-35.813L344.093 333a158 158 0 0 0-19.03-12.156l-3.345-40.97l-26.314 28.876c-7.31-2.074-14.792-3.58-22.437-4.438l-15.5-33.25l-15.5 33.282c-8.14.916-16.12 2.522-23.876 4.812l-24.875-27.28l-3.157 38.874a158.5 158.5 0 0 0-19.22 12.25l-25.624-16.72l4.03 35.814c-21.08 21.95-37.618 50.19-47.656 82.344c7.482-67.188 25.17-126.485 49.562-170.782L169.5 279l-6.28-35.188c7.37-10.983 15.213-20.71 23.468-29.03l19.25 27.374l3.937-46.312c9.4-5.963 19.193-10.22 29.25-12.563z"
                  ></path>
                </svg>
                <h2 className="spotlight_h2">Shark of the month</h2>
              </div>
              {error && <p className="error">Error: {error}</p>}
              {sharkFishData && <SharkFish shark={sharkFishData.shark} />}
            </div>
            <div className="main_fish">
              <div className="main_spotlight_box">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="60px"
                  height="60px"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="white"
                    d="m59.939 59.705l-4.398-15.86a1.74 1.74 0 0 0-1.244-1.2c-.799-2.857-3.133-11.039-7.691-25.657C42.809 4.815 32.928.833 24.815 2.285c-8.028 1.438-13.218 7.881-12.62 15.667l.495-.036v2.64a1.96 1.96 0 0 0-1.272-.433c-.981.009-1.769.684-1.759 1.505c.003.191.205.439.505.706c-3.688 2.453-6.282 9.456-6.16 17.697c.076 5.248 2.581 9.951 5.007 13.301c-2.85 1.352-4.758 3.926-4.716 6.862C4.314 61.538 5.231 62 6.482 62c2.743 0 7.093-2.223 7.093-2.223s4.3 2.08 7.049 2.08c1.305 0 2.26-.469 2.239-1.851c-.041-2.937-2.023-5.471-4.911-6.765c2.329-3.396 4.696-8.15 4.62-13.398c-.115-8.082-2.809-14.913-6.458-17.417c.389-.331.661-.642.657-.869c-.012-.824-.82-1.483-1.803-1.472a1.94 1.94 0 0 0-1.258.46V17.84l.521-.038C13.624 9.889 19.297 5.28 25.189 4.225c7.216-1.292 16.029 2.329 19.461 13.333c3.258 10.446 5.377 17.595 6.609 21.858c-1.981-2.452-5.514-3.358-8.557-1.986c-3.54 1.593-5.071 5.657-3.42 9.077c.184.38.402.732.645 1.063l-5.426 5.242h-1.637v2.43h5.841v-2.43h-.719l3.696-3.57a7.27 7.27 0 0 0 6.995.572a6.95 6.95 0 0 0 3.374-3.215l3.918 14.133c.254.914 1.225 1.455 2.17 1.211l.547-.143c.946-.245 1.506-1.183 1.253-2.095m-42.295-9.809c-.375.23-.845.375-1.375.369c-1.268-.012-2.249-.725-2.303-1.66c-.025-.521-1.082-.51-1.093.013c-.018.897-.982 1.711-2.242 1.698a2.86 2.86 0 0 1-1.426-.377a25.4 25.4 0 0 1-1.881-3.841a5.1 5.1 0 0 0 2.344.495c1.63-.037 2.995-.711 3.703-1.686c.743.971 2.124 1.658 3.742 1.619a5.6 5.6 0 0 0 2.322-.55a25 25 0 0 1-1.791 3.92m2.297-5.57c-.488.805-1.556 1.398-2.84 1.391c-1.756-.01-3.149-1.005-3.207-2.285c-.021-.524-1.103-.516-1.105.008c-.014 1.243-1.377 2.354-3.133 2.344c-1.293-.008-2.387-.553-2.896-1.35a17 17 0 0 1-.657-3.655c.818.722 1.979 1.187 3.291 1.155c1.73-.041 3.181-.841 3.897-1.987c.752 1.14 2.223 1.952 3.95 1.911c1.311-.029 2.458-.5 3.254-1.221a17 17 0 0 1-.554 3.689m.875 15.526a3 3 0 0 1-.192.006c-1.646 0-4.644-1.15-6.144-1.874l-.93-.449l-.919.47C11.617 58.521 8.313 60 6.482 60q-.082 0-.145-.004c.047-1.984 1.398-3.838 3.564-4.864l2.172-1.03l-1.397-1.928a32 32 0 0 1-.756-1.094c.234.034.476.053.726.046c1.201-.033 2.217-.499 2.799-1.194c.606.697 1.636 1.178 2.835 1.145q.37-.013.714-.076q-.373.596-.736 1.127l-1.34 1.955l2.185.979c2.197.983 3.604 2.806 3.713 4.79m-1.174-27.238c-1.13 1.29-2.719 2.282-4.57 2.733c-2.664.648-5.486.23-7.741-1.115c-.507-.303-.981.403-.477.703c2.427 1.449 5.623 1.928 8.482 1.189c1.772-.455 3.334-1.318 4.539-2.463c.329 1.619.544 3.39.62 5.281c-.362 1.176-1.66 2.112-3.268 2.105c-1.884-.009-3.395-1.176-3.451-2.672c-.017-.521-1.017-.512-1.022.01c-.01 1.455-1.485 2.747-3.372 2.737c-1.615-.008-2.945-.867-3.334-2.051c.071-6.153 1.751-11.722 4.375-14.356c.533-.535 1.071-.89 1.609-1.101c.67.394 1.222.679 1.222.679s.465-.253 1.055-.612c2.102.949 4.189 4.213 5.333 8.933m27.544 14.102a3.62 3.62 0 0 1-2.909.019l2.823-2.727l-1.743-1.685l-2.857 2.761l-.013-.02c-.825-1.711-.06-3.744 1.709-4.541c1.771-.797 3.874-.057 4.7 1.653c.826 1.711.059 3.742-1.71 4.54"
                  ></path>
                  <path
                    fill="white"
                    d="M10.693 27.064c-1.128.01-2.034.688-2.019 1.516c.016.83.939 1.492 2.067 1.484c1.125-.01 2.031-.691 2.017-1.52c-.016-.829-.937-1.491-2.065-1.48"
                  ></path>
                </svg>
                <h2 className="spotlight_h2">개방수 피쉬 ㅋ</h2>
              </div>

              {error && <p className="error">Error: {error}</p>}
              {sharkFishData && <SharkFish fish={sharkFishData.fish} />}
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
}

export default MainPage;
