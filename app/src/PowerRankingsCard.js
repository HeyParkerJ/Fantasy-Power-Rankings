import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
const emoji = require('emoji-dictionary');

const renderVoter = (users, teamId, className) => {
  let team;

  users.forEach(t => {
    if (t.teamId === teamId) {
      team = t;
    }
  });

  return <CardHeader className={className} title={team.username}></CardHeader>;
};

const renderRankings = (rankings, users) => {
  // we have to get the emojis from the users object and amtch it with the submissions in rankings object
  // For each ranking, loop through each user and when the teamId of the user matches,

  rankings = rankings.rankings[0];
  let rankingRows = [];
  rankings.forEach((r, index) => {
    users.forEach(u => {
      if (u.teamId === r.teamId) {
        r.emoji = u.emoji;
      }
    });

    rankingRows.push(
      <div key={index + 1}>
        {index + 1}: &nbsp;
        {r.username}
        &nbsp;
        <span>{emoji.getUnicode(r.emoji)}</span>
      </div>
    );
  });
  return <div>{rankingRows}</div>;
};

const styles = {
  card: {
    maxWidth: 275,
    minWidth: 200
  },
  header: {
    padding: '10px'
  }
};

let PowerRankingsCard = props => {
  const { classes } = props;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent>
          {renderVoter(props.users, props.rankings.teamId, classes.header)}
          {renderRankings(props.rankings, props.users)}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(PowerRankingsCard);
