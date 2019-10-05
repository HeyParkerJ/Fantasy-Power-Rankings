export default {
  createAggregateRankings: rankings => {
    let aggregateRankingsObject = {};
    rankings.forEach(ranking => {
      ranking.rankings[0].forEach((rank, index) => {
        index++;
        let teamId = rank.teamId;
        if (!aggregateRankingsObject.hasOwnProperty(teamId)) {
          aggregateRankingsObject[teamId] = {
            username: rank.username,
            rankingsArray: [index],
            rankingsAverage: [index],
            teamId: teamId
          };
        } else {
          let arr = aggregateRankingsObject[teamId].rankingsArray;
          arr.push(index);

          if (arr.length) {
            let sum = arr.reduce(function(a, b) {
              return a + b;
            });
            let avg = sum / arr.length;
            aggregateRankingsObject[teamId].rankingsAverage = avg;
          }
        }
      });
    });
    return aggregateRankingsObject;
  },

  // Intakes an aggregateRankignsObject and outputs an array of teams sorted by placement
  createAggregateRankingsArray: aggregateRankingsObject => {
    let placementsArray = [];
    for (let placement in aggregateRankingsObject) {
      placementsArray.push(aggregateRankingsObject[placement]);
    }

    placementsArray.sort((a, b) => {
      return a.rankingsAverage - b.rankingsAverage;
    });

    return placementsArray;
  },

  /* This is the sliding door algorithm.

    Set a leader and an anchor index.
    Start both at 0
    Increment the leader index and compare it to the follower index
    While
      they match
        Set the dataPoint on every index between the two (make a walker index?)
        Increment the leader index and check again
      else
        Increment the follower index
    */
  appendTieAdjustedRankings: placementsArray => {
    let leaderIndex = 0;
    let anchorIndex = 0;
    let stop = false;

    while (
      placementsArray[leaderIndex] &&
      placementsArray[anchorIndex] &&
      !stop
    ) {
      let leaderPlacement = placementsArray[leaderIndex];
      let anchorPlacement = placementsArray[anchorIndex];

      if (leaderPlacement.rankingsAverage === anchorPlacement.rankingsAverage) {
        // anchorIndex in this case is basically the original (and highest) ranking
        leaderPlacement.tieAdjustedRanking = anchorIndex + 1;
        leaderIndex++;
      } else {
        anchorPlacement.tieAdjustedRanking = anchorIndex + 1;
        if (!placementsArray[leaderIndex + 1]) {
          leaderPlacement.tieAdjustedRanking = leaderIndex + 1;
        }
        anchorIndex = leaderIndex;
        // Terminates once leaderIndex reaches out of bounds
        leaderIndex++;
      }
    }
    return placementsArray;
  },

  /*
    Used because emojis are a part of the users array, but not the rankingsArray object
*/
  appendEmojisToRankingsArray: (rankingsArray, users) => {
    rankingsArray.forEach((r, index) => {
      users.forEach(u => {
        if (u.teamId === r.teamId) {
          r.emoji = u.emoji;
        }
      });
    });
    return rankingsArray;
  }
};
