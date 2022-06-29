export const getScore = (scores: number[]): number => {
  let scoreResult: number;
  // Here is where I got stuck, because I didnt spread scores on line 5 with ... notation, which caused reference copy issues
  // (on lines 10 + 15, changing modifiedScores also caused scores to change, causing 'and a strike precedes a spare' test to fail).
  let modifiedScores: number[] = [...scores];

  scores.forEach((score, i) => {
    //check for a strike to add a bonus, but not on the 10th frame
    if (score === 10 && i < 9) {
      modifiedScores[i] += scores[i + 1] + scores[i + 2];
    } else if (
      score + scores[i + 1] === 10 &&
      (i % 2 === 0 || scores[i - 1] === 10)
    ) {
      modifiedScores[i] += scores[i + 2];
    }
  });

  scoreResult = modifiedScores.reduce((partialSum, a) => partialSum + a, 0);
  return scoreResult;
};

//Unfortunately, this function will break if given a set of scores longer than 10 unless it is a perfect game (from line 9).
//The improved version of this function handles this scenario with a unit test as proof.
//I believe all real score scenarios, mid to endgame, are accounted for in the new version.
