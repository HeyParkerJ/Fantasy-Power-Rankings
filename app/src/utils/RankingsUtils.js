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
  },

  /* This is the sliding door algorithm.

    Set a leader and an anchor index.
    Start both at 0
    Increment the leader index and compare it to the follower index
    While
      they match
        Increment the leader index and check again
      else
        Set the dataPoint on every index between the two (make a walker index?)
        Increment the follower index
    */
  // TODO - do real testing on this
  appendTieAdjustedRankings: (placementsArray) => {
    



    placementsArray.forEach((placment, index, originalArray) => {
      // Check next index for same average
      let nextItemRankingsAverage = null
      let nextItemRankingsAverageMatches = true
      while(nextItemRankingsAverageMatches) {
        if()
      }
      let nextItem = originalArray[index+1]

      if (!nextItem) { return null }

      if(nextItem.rankingsAverage === placement.rankingsAverage) {
        // Keep looking at the next item until it doesn't match anymore
        // If you find a match, add it to an array of matches
        let loopingIndex = index
        let nextItem = originalArray[index+loopingIndex]
        while (nextItem) {
          if(nextItem)
          nextItem = 
            loopingIndex++
        }
      }

      debugger
    })
  },

  /*
    Used because emojis are a part of the users array, but not the rankingsArray object
*/
  appendEmojisToRankingsArray: (rankingsArray, users) => {
    rankingsArray.forEach((r, index) => {
      users.forEach((u) => {
        if(u.teamId === r.teamId) {
          r.emoji = u.emoji
        }
      })
    })
    return rankingsArray
  }

}
