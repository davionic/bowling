export const calculateTotalScore = (scores: number[]): number => {
  //convert scores into frames and calculate bonuses
  const framedScores = convertToFrames(scores);
  const scoresWithBonuses = calculateBonuses(framedScores);

  //add together all scores with bonuses
  return scoresWithBonuses.reduce((partialSum, a) => partialSum + a, 0);
};

export const convertToFrames = (scores: number[]): number[][] => {
  //This incrementor is used to skip over each second roll of each frame - only push the current and next score when on the first roll of the frame
  let frameRollNumber: 1 | 2 = 1;
  let scoresInFrames: number[][] = [];

  //In my opinion, this syntax is much cleaner than reduce() for this use case
  scores.forEach((score, i) => {
    if (score === 10 && frameRollNumber === 1) {
      scoresInFrames.push([10]);
    } else if (frameRollNumber === 1) {
      scoresInFrames.push([score, scores[i + 1]]);
      frameRollNumber = 2;
    } else {
      frameRollNumber = 1;
    }
  });

  return scoresInFrames;
};

export const calculateBonuses = (frames: number[][]): number[] => {
  let scoresWithBonuses: number[] = [];

  frames.forEach((frame, i) => {
    //check for a strike to add a bonus, but not on the 10th frame
    if (frame[0] === 10 && i < 9) {
      // if there is a strike, add the first throw of the next frame, then check for a second throw in that frame (in case of another strike).
      // If a strike occured again, grab the first throw of the following frame.
      scoresWithBonuses.push(
        10 + (frames[i + 1][0] + (frames[i + 1][1] || frames[i + 2][0]))
      );
    } else if (frame[0] + frame[1] === 10 && i < 9) {
      //if there is a spare, add the value of the following throw
      scoresWithBonuses.push(10 + frames[i + 1][0]);
    } else {
      // '||' operator to protect against undefined frame[1] for strikes during final frame
      scoresWithBonuses.push(frame[0] + (frame[1] || 0));
    }
  });

  return scoresWithBonuses;
};

//Overall, I find this approach much more human-readable than the given example. It also fixes an edge case.
