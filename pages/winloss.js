// pages/fantasyData.tsx
import React, { useEffect, useState } from "react";
import LineGraph from "../components/LineGraph";
import axios from "axios";

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
  sleeper: {
    0: "Chubs",
    1: "Waff",
    2: "Sujay",
    3: "Avi",
    4: "Eeswar",
    5: "Romo",
    6: "Rohan",
    7: "Keg",
    8: "Santosh",
    9: "Ved",
    10: "Thomas",
    11: "Arhan",
  },
};

const sleeperLeagueIds = {
  2022: "860413600286744576",
  2023: "988741650312704000",
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
  Thomas: [],
  Eeswar: [],
};

const updateData = (allTimeOverUnder, team, won, setData) => {
  // console.log("hi")
  // console.log(allTimeOverUnder)
  // console.log(team);
  // console.log(allTimeOverUnder[team]);
  let len = allTimeOverUnder[team].length;
  if (len === 0) {
    allTimeOverUnder[team].push(won);
  } else allTimeOverUnder[team].push(allTimeOverUnder[team][len - 1] + won);
};

const addSeasonalData = async (startWeek, endWeek, year, myClient, setData) => {
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
      Thomas: 0,
      Eeswar: 0,
    };
    try {
      const teams = await myClient.getHistoricalScoreboardForWeek({
        seasonId: year,
        matchupPeriodId: week,
        scoringPeriodId: week,
      });

      console.log(year, week);

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
};

const sleeperAddSeasonalData = async (endWeek, year, setData) => {
  return new Promise((resolve, reject) => {
    let completedWeeks = 0;
    for (let week = 1; week <= endWeek; week++) {
      // weeklyMatchups = {matchupId:{homeTeamId, awayTeamId, homeTeamScore, awayTeamScore}};
      const weeklyMatchups = [{}, {}, {}, {}, {}, {}];
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
        Thomas: 0,
        Eeswar: 0,
      };
      const findMedian = [];
      try {
        completedWeeks++;
        if (completedWeeks === endWeek) {
          resolve(); // Resolve the promise when all weeks are processed
        }
        axios
          .get(
            `https://api.sleeper.app/v1/league/${sleeperLeagueIds[year]}/matchups/${week}`
          )
          .then((response) => {
            // Handle the API response data here
            response.data.forEach((matchup) => {
              const matchup_id = matchup.matchup_id - 1;
              if (weeklyMatchups[matchup_id].homeTeamId !== undefined) {
                weeklyMatchups[matchup_id].awayTeamId = matchup.roster_id - 1;
                weeklyMatchups[matchup_id].awayTeamScore = matchup.points;
              } else {
                weeklyMatchups[matchup_id] = {
                  homeTeamId: matchup.roster_id - 1,
                  homeTeamScore: matchup.points,
                };
              }
              findMedian.push(matchup.points);
            });

            findMedian.sort((a, b) => a - b);
            const medianScore = (findMedian[5] + findMedian[6]) / 2;

            console.log(year, week);
            // console.log(weeklyMatchups);

            for (const matchupId in weeklyMatchups) {
              const matchup = weeklyMatchups[matchupId];
              const homeTeamScore = matchup.homeTeamScore;
              const awayTeamScore = matchup.awayTeamScore;
              const homeTeam = teamIDs.sleeper[matchup.homeTeamId];
              const awayTeam = teamIDs.sleeper[matchup.awayTeamId];

              if (homeTeamScore > awayTeamScore) {
                weeklyScores[homeTeam] = 1;
                weeklyScores[awayTeam] = -1;
              } else {
                weeklyScores[homeTeam] = -1;
                weeklyScores[awayTeam] = 1;
              }
              if (homeTeamScore > medianScore) weeklyScores[homeTeam]++;
              else weeklyScores[homeTeam]--;
              if (awayTeamScore > medianScore) weeklyScores[awayTeam]++;
              else weeklyScores[awayTeam]--;
            }
            for (const team in weeklyScores) {
              updateData(allTimeOverUnder, team, weeklyScores[team], setData);
            }
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        reject(error);
      }
    }
  });
};

const WinLoss = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const initClient = async () => {
      const { Client } = await import("espn-fantasy-football-api");
      const myClient = new Client({ leagueId: 91791069 });
      await addSeasonalData(3, 12, 2019, myClient, setData); // streamline later so it doesnt take so long, these can be synchronous
      await addSeasonalData(1, 12, 2020, myClient, setData);
      await addSeasonalData(1, 14, 2021, myClient, setData);
      await sleeperAddSeasonalData(14, 2022, setData);
      await sleeperAddSeasonalData(4, 2023, setData);
    };
    initClient().then(() => {
      setData(allTimeOverUnder);
      console.log(allTimeOverUnder);
    });
  }, []);

  return (
    <div>
      <h1>Regular Season Win Loss Differential</h1>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */}
      {data ? <LineGraph data={allTimeOverUnder} /> : <p>Loading...</p>}
    </div>
  );
};

export default WinLoss;
