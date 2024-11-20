<div>
  <h1>♠Poker-Tracker</h1>
</div>
<div>
  <h2>a.프로젝트 소개</h2>
  <p>
    포커게임을 무료로 제공해주는 웹사이트는 많지만, 로그인 및 회원가입 없이 기능을 제공해주기에 친구들끼리 플레이 한 후
    기록을 남기기 어려웠습니다. 
    해당 웹사이트는 로그인 및 회원가입 기능이 없는 대신에 각자 이름을 등록해 기록을 남길 수 있도록 했습니다.
    친구들끼리 게임을 진행한 후 게임 결과를 웹사이트에 기록하면 해당 세션이 저장되며 시간이 지나도 지난 세션을 검색할 수 있습니다.
    전체 기간 혹은 한달, 당일 등 원하는 기간 내의 최고, 최악을 플레이어 및 최고 수익자와 상금 등이 표시되며 리더보드를 통해
    전체 플레이어중 몇등을 차지하고 있는지 알 수 있습니다.
  </p>
  <h2>a.Porject Info</h2>
  <p>
    There are a lot of websites we can play poker online. With no signup and signin they provide us free games. <br>
  Me and my friends loved this game but because websites are free with no identification it was hard to review sessions we played.<br>
  So two of us started making this Poker-Tracking project.<br>
  This website in first publish will be used with no identification.<br>
  It has 'create-user', 'create-game', 'leaderboard' and 'main' page.<br>
  Before Playing poker we should create user. Maybe it will soon replaced with signup, signin fucntion.<br>
  After playing poker online or offline, user create game and list up the result.<br>
  Then it will show up who is the best, worst poker player and who won and lost how much money.<br>
  By entering each session, website will automatically shows up every values.<br>
  </p>
</div>
<div>
  <h2>b.Pages</h2>
</div>
<div>
  <h2>c.개발 기간(Time laps)</h2>
  <p> 2024/11/13 : 백엔드 서버 aws 배포</p>
  <p> 2024/11/14 : 프론트엔드 vercel 배포</p>
  <p> 2024/11/08 ~ 2024/11/14 : 개발 및 v1 배포 완료</p>
  <p> 2024/1120 : 실제 데이터 입력 및 유저 사용 시작, vercel_analytics 설치</p>
</div>
<div>
  <h2>d.Versions</h2>
  <p>V1 : creatUser, userLeaderboard, userDetail, createGame, gameDetail </p>
</div>
<div>
  <h2>e.Developer</h2>
  <ul> FE, Design : 정일형
    <li>git : JohnJung-1017</li>
    <li>E-mail : jungih1017@gmail.com</li>
    <li>
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
    </li>
    <li>
      <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
      <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
    </li>
    <li><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></li>
  </ul>
  <ul> BE, DevOps : 최현택
    <li>git : cuixianze123 </li>
    <li>E-mail : cuixianze2286@naver.com </li>
    <li>
      <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
      <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
    </li>
    <li>
      <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
      <img src="https://img.shields.io/badge/amazonwebservices-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">
    </li>
    <li><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></li>
    
  </ul>
</div>
<div>
  <h2>f.Deploy</h2>
  <div>
    <h3>Frontend</h3>
    <p>
      <h4>배포 방식</h4>
      기존 레포를 fork하여 배포용 레포 생성 <br>
      Vercel을 사용하여 frontend 배포<br>
      오류 및 버전 업데이트가 필요한 경우 업스트림 레포에서 작업의 PR을 생성한 후 현재 레포에 병합
    </p>
    <p>
      <h4>업데이트 방식</h4>
      <ul>
        <li>upstream 레포에서 작업 및 로컬에서 실행 확인</li>
        <li>upstream 레포에 merge</li>
        <li>fork 레포에 update</li>
          [git bash] <br>
          git fetch upstream<br>
          git merge upstream/main<br>
          git push origin main<br>
        <li>vercel에 자동반영</li>
      </ul>
    </p>
  </div>
  <div>
    <h3>Backend</h3>
    
  </div>
</div>

