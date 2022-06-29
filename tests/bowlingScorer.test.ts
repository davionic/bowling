import { getScore } from "./../src/bowlingScorer";

describe("getScore", () => {
  test("when no special scores occur", () => {
    let scores = [1, 2, 3, 4];

    expect(getScore(scores)).toEqual(10);
  });

  test("when a spare is scored", () => {
    let scores = [3, 7, 5, 0];

    expect(getScore(scores)).toEqual(20);
  });

  test("when a strike is scored", () => {
    let scores = [10, 5, 4];

    expect(getScore(scores)).toEqual(28);
  });

  test("when sibling scores equal 10 but are not in the same frame", () => {
    let scores = [3, 3, 7, 2];

    expect(getScore(scores)).toEqual(15);
  });

  test("and a strike precedes a spare", () => {
    let scores = [10, 3, 7, 5, 0];

    expect(getScore(scores)).toEqual(40);
  });

  test("when a perfect game is bowled", () => {
    let scores = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

    expect(getScore(scores)).toEqual(300);
  });
});
