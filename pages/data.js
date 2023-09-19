// // pages/fantasyData.tsx
// 'use client'
// import React, { useEffect, useState } from 'react';
// const { Client } = require('espn-fantasy-football-api');

// type options = {
//   seasonId: Number,
//   matchupPeriodId: Number,
//   scoringPeriodId: Number
// }

// const teamIDs = {
//   2019:{
//     1:"Chubs",
//     2:"Waff",
//     3:"Rohan",
//     4:"Sumanth",
//     5:"Romo",
//     6:"Arhan",
//     7:"Keg",
//     8:"Avi"
//   },
//   2020:{
//     1:"Chubs",
//     2:"Waff",
//     3:"Rohan",
//     4:"Santosh",
//     5:"Romo",
//     6:"Arhan",
//     7:"Keg",
//     8:"Avi"
//   },
//   2021:{
//     1:"Chubs",
//     2:"Waff",
//     3:"Rohan",
//     4:"Santosh",
//     5:"Romo",
//     6:"Arhan",
//     7:"Keg",
//     8:"Avi",
//     9:"Ved",
//     10:"Sujay"
//   },
//   2022:{
//     1:"Chubs",
//     2:"Waff",
//     3:"Rohan",
//     4:"Santosh",
//     5:"Romo",
//     6:"Arhan",
//     7:"Keg",
//     8:"Avi",
//     9:"Ved",
//     10:"Sujay"
//   },
// }
// const FantasyDataPage: React.FC = () => {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     // Create a Client instance and set the cookies
//     const myClient = new Client({ leagueId: 91791069 });

//     // Use the Client instance to fetch data
//     // myClient.getBoxscoreForWeek({seasonId:2019,matchupPeriodId:1,scoringPeriodId:1}).then((teams: any) => {
//     //   setData(teams);
//     // }).catch((error: any) => {
//     //   console.error('Error fetching data:', error);
//     // });

//     myClient.getHistoricalScoreboardForWeek({seasonId:2019,matchupPeriodId:3,scoringPeriodId:3}).then((teams: any) => {
//       setData(teams);
//     }).catch((error: any) => {
//       console.error('Error fetching data:', error);
//     });

  
    
//   }, []);

//   return (
//     <div>
//       <h1>Fantasy Football Data</h1>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default FantasyDataPage;
