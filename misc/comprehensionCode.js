class Game {
  #scores = [];

  //This checks if current index is the second roll of the frame, or is a strike on the first roll.
  //It does this by grabbing a piece of the scores array, up to the given index, and increments the acc by 1 for every non-10 number,
  //or 2 if core at current index is 10. If the final result is odd (based on line 12-14), it is the first throw in the frame and thus not at the boundary.
  #isFrameBoundary(index) {
    return (
      this.#scores.slice(0, index + 1).reduce(function (acc, x) {
        return acc + (x === 10 ? 2 : 1);
      }, 0) %
        2 ===
      0
    );
  }

  //This checks for a spare
  #isSpare(index) {
    //first confirm this index not being the second throw in a frame
    if (!this.#isFrameBoundary(index)) {
      return false;
    }

    return (
      //check the values of each neighboring index score to see if they add to 10
      this.#scores.slice(index - 1, index + 1).reduce((acc, x) => acc + x) ===
      10
    );
  }

  //this checks if the current index is in the final, 10th frame
  #isFinalFrame(index) {
    return (
      //create an incremented array of indices up to the given index number,
      //filter to the number of frames in the full score array using isFrameBoundary,
      //then check if the length of those frames is 9 or greater, indicating the final frame
      [...Array(index).keys()].filter((i) => this.#isFrameBoundary(i)).length >=
      9
    );
  }

  score(playerScores) {
    //grab base scores property
    this.#scores = playerScores;

    //iterate through each score, with acc being the eventual end result after adding scores and bonuses from each index
    return this.#scores.reduce(
      function (acc, x, i) {
        //check if the score at the current index is in the final frame
        if (!this.#isFinalFrame(i)) {
          //if not in the final frame, check for a ten
          if (x === 10) {
            //if not in the final frame and is a ten, add the next two scores to the current index score
            x = this.#scores
              .slice(i, i + 3)
              .reduce((prev, curr) => prev + curr);
          }
          //if current index score is in the final frame, but not a 10, check for a spare, and add the following score to the current index score if so
          else if (this.#isSpare(i)) {
            x = x + this.#scores[i + 1];
          }
        }
        //add the current index score, which will now be adjusted for bonuses, to the accumulator
        return acc + x;
      }.bind(this),
      0
    );
  }
}

// Test against the pairing exercise
const game = new Game();

console.log("expected: 10", game.score([1, 2, 3, 4])); // 10
console.log("expected: 20", game.score([3, 7, 5, 0])); // 20
console.log("expected: 28", game.score([10, 5, 4])); // 28
console.log("expected: 15", game.score([3, 3, 7, 2])); // 15
console.log("expected: 40", game.score([10, 3, 7, 5, 0])); // 40
console.log(
  "expected: 300",
  game.score([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
); // 300

//Noticed one flaw:

//incorrect result if you roll a 0 + 10 spare
console.log("expected: 26", game.score([0, 10, 7, 2, 0]));
//gives 28, because the 10 is registered as a strike, though it is a spare. Fixed in bowlingScorerImproved.ts
