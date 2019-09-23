import resolvers from "../resolvers";

describe("Recipes", () => {
  const recipeCount = 1;

  it("returns a list of recipes", async () => {
    const res = await resolvers.Query.recipes();
    // currently the resolvers add 1 recipe
    expect(res.length).toEqual(recipeCount);
  });
});
