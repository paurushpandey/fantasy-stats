// pages/fantasyData.tsx
import React, { useEffect, useState } from "react";

const teamIDs = {
  2019: {
    1: "Chubs",
    2: "Waff",
    3: "Rohan",
    4: "Sumanth",
    5: "Romo",
    6: "Arhan",
    7: "Keg",
    8: "Avi",
  },
  2020: {
    1: "Chubs",
    2: "Waff",
    3: "Rohan",
    4: "Santosh",
    5: "Romo",
    6: "Arhan",
    7: "Keg",
    8: "Avi",
  },
  2021: {
    1: "Chubs",
    2: "Waff",
    3: "Rohan",
    4: "Santosh",
    5: "Romo",
    6: "Arhan",
    7: "Keg",
    8: "Avi",
    9: "Ved",
    10: "Sujay",
  },
  2022: {
    1: "Chubs",
    2: "Waff",
    3: "Rohan",
    4: "Santosh",
    5: "Romo",
    6: "Arhan",
    7: "Keg",
    8: "Avi",
    9: "Ved",
    10: "Sujay",
  },
};

const allTimeOverUnder = {
  Chubs: [],
  Waff: [],
  Rohan: [],
  Santosh: [],
  Romo: [],
  Arhan: [],
  Keg: [],
  Avi: [],
  Ved: [],
  Sujay: [],
  Sumanth: [],
};
const updateData = (allTimeOverUnder, team, won, setData) => {
  let len = allTimeOverUnder[team].length;
  if (allTimeOverUnder[team].length == 0) {
    allTimeOverUnder[team].push(0);
    len++;
  }
  allTimeOverUnder[team].push(allTimeOverUnder[team][len - 1] + won);
  console.log(allTimeOverUnder);
  if (allTimeOverUnder[team].length == 11) setData(allTimeOverUnder);
};
const WinLoss = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Create a Client instance and set the cookies
    const initClient = async () => {
      const { Client } = await import("espn-fantasy-football-api");
      const myClient = new Client({ leagueId: 91791069 });
      for (let i = 3; i <= 12; i++) {
        const weeklyScores = {
          Chubs: 0,
          Waff: 0,
          Rohan: 0,
          Santosh: 0,
          Romo: 0,
          Arhan: 0,
          Keg: 0,
          Avi: 0,
          Ved: 0,
          Sujay: 0,
          Sumanth: 0,
        };
        myClient
          .getHistoricalScoreboardForWeek({
            seasonId: 2019,
            matchupPeriodId: i,
            scoringPeriodId: i,
          })
          .then((teams) => {
            teams.forEach((matchup) => {
              const homeTeam = teamIDs[2019][matchup.homeTeamId];
              const awayTeam = teamIDs[2019][matchup.awayTeamId];
              if (matchup.homeScore > matchup.awayScore) {
                weeklyScores[homeTeam] = 1;
                weeklyScores[awayTeam] = -1;
              } else {
                weeklyScores[homeTeam] = -1;
                weeklyScores[awayTeam] = 1;
              }
            });
            for (const team in weeklyScores) {
              updateData(allTimeOverUnder, team, weeklyScores[team], setData);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };
    initClient();
  }, []);

  return (
    <div>
      <h1>Fantasy Football Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default WinLoss;
