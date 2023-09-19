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
  // console.log("hi")
  let len = allTimeOverUnder[team].length;
  if (len===0){
    allTimeOverUnder[team].push(won);
  }
  else allTimeOverUnder[team].push(allTimeOverUnder[team][len - 1] + won);
};
const addSeasonalData= async (startWeek,endWeek,year,myClient,setData)=>{
  for (let week = startWeek; week <= endWeek; week++) {
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
    try {
      const teams = await myClient.getHistoricalScoreboardForWeek({
        seasonId: year,
        matchupPeriodId: week,
        scoringPeriodId: week,
      });

      // console.log(year, week);

      teams.forEach((matchup) => {
        const homeTeam = teamIDs[year][matchup.homeTeamId];
        const awayTeam = teamIDs[year][matchup.awayTeamId];

        if (matchup.homeScore > matchup.awayScore) {
          weeklyScores[homeTeam] = 1;
          weeklyScores[awayTeam] = -1;
        } else {
          weeklyScores[homeTeam] = -1;
          weeklyScores[awayTeam] = 1;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    for (const team in weeklyScores) {
      updateData(allTimeOverUnder, team, weeklyScores[team], setData);
    }
  }
}
const WinLoss = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Create a Client instance and set the cookies
    const initClient = async () => {
      const { Client } = await import("espn-fantasy-football-api");
      const myClient = new Client({ leagueId: 91791069 });
      await addSeasonalData(3,12,2019,myClient,setData);
      await addSeasonalData(1,12,2020,myClient,setData);
      await addSeasonalData(1,14,2021,myClient,setData);
      setData(allTimeOverUnder);
      // console.log(allTimeOverUnder);
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
