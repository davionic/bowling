import {
  calculateTotalScore,
  convertToFrames,
  calculateBonuses,
} from "../src/bowlingScorerImproved";

describe("getScore2", () => {
  test("when no special scores occur", () => {
    let scores = [1, 2, 3, 4];

    expect(calculateTotalScore(scores)).toEqual(10);
  });

  test("when a spare is scored", () => {
    let scores = [3, 7, 5, 0];

    expect(calculateTotalScore(scores)).toEqual(20);
  });

  test("when a strike is scored", () => {
    let scores = [10, 5, 4];

    expect(calculateTotalScore(scores)).toEqual(28);
  });

  test("when sibling scores equal 10 but are not in the same frame", () => {
    let scores = [3, 3, 7, 2];

    expect(calculateTotalScore(scores)).toEqual(15);
  });

  test("and a strike precedes a spare", () => {
    let scores = [10, 3, 7, 5, 0];

    expect(calculateTotalScore(scores)).toEqual(40);
  });

  test("when a 0 + 10 spare is rolled", () => {
    let scores = [0, 10, 7, 2, 0];

    expect(calculateTotalScore(scores)).toEqual(26);
  });

  test("when a perfect game is bowled", () => {
    let scores = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

    expect(calculateTotalScore(scores)).toEqual(300);
  });

  test("when a game with no strikes or spares is bowled", () => {
    let scores = [2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3];

    expect(calculateTotalScore(scores)).toEqual(60);
  });

  test("when a game with a spare on the 10th frame is bowled, followed by a strike (no bonus applied to spare)", () => {
    let scores = [
      2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 6, 10,
    ];

    expect(calculateTotalScore(scores)).toEqual(73);
  });
});

describe("convertToFrames", () => {
  let scores = [10, 3, 7, 10, 5, 2];
  let strikes = [10, 10, 10, 10];
  test("when given some strikes", () => {
    expect(convertToFrames(scores)).toEqual([[10], [3, 7], [10], [5, 2]]);
  });

  test("when given all strikes", () => {
    expect(convertToFrames(strikes)).toEqual([[10], [10], [10], [10]]);
  });
});

describe("calculateBonuses", () => {
  let framedScores = [[10], [3, 7], [10], [5, 2]];
  let framedScoresPerfectGame = Array(12).fill([10]);

  test("when given some strikes", () => {
    expect(calculateBonuses(framedScores)).toEqual([20, 20, 17, 7]);
  });

  test("perfect game", () => {
    expect(calculateBonuses(framedScoresPerfectGame)).toEqual([
      30, 30, 30, 30, 30, 30, 30, 30, 30, 10, 10, 10,
    ]);
  });
});
