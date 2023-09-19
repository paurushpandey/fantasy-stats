import React from 'react';
import FantasyDataPage from './data';
import WinLoss from './winloss';

const HomePage = () => {
  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-semibold">Welcome to Papa's League Fantasy Football</h1>
      <p className="mt-4 text-lg">
        This website is dedicated to bringing you the latest updates and statistics from Papa's League, a thrilling fantasy football competition.
      </p>
      <p className="mt-4 text-lg">
        Whether you're a participant, a fan, or just curious, you'll find a wealth of information about the league, including player stats, team standings, and more.
      </p>
      <p className="mt-4 text-lg">
        Stay tuned for live match updates, player profiles, and expert analysis of Papa's League. It's all here, and we're excited to have you on board!
      </p>
      <WinLoss></WinLoss>
      {/* <FantasyDataPage></FantasyDataPage> */}

    </div>
  );
};

export default HomePage;
