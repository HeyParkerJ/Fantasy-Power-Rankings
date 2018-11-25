export default {

  createAggregateRankings: (rankings) => {
    let aggregateRankingsObject = {}
    rankings.forEach((ranking) => {
      ranking.rankings[0].forEach((rank, index) => {
        index++
        let teamId = rank.teamId
        if(!aggregateRankingsObject.hasOwnProperty(teamId)) {
          aggregateRankingsObject[teamId] = {
            username: rank.username,
            rankingsArray: [index],
            rankingsAverage: [index],
            teamId: teamId
          }
        } else {
          let arr = aggregateRankingsObject[teamId].rankingsArray
          arr.push(index)

          if (arr.length) {
            let sum = arr.reduce(function(a, b) { return a + b; });
            let avg = sum / arr.length;
            aggregateRankingsObject[teamId].rankingsAverage = avg
          }
        }
      })
    })
    return aggregateRankingsObject
  },

  // Intakes an aggregateRankignsObject and outputs an array of teams sorted by placement
  createAggregateRankingsArray: (aggregateRankingsObject) => {
    let placementsArray = []
    for (let placement in aggregateRankingsObject) {
      placementsArray.push(aggregateRankingsObject[placement])
    }

    placementsArray.sort((a, b) => {
      return a.rankingsAverage - b.rankingsAverage
    })

    return placementsArray
  }

}
