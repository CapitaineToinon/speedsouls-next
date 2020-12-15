import { reactive, toRefs } from "vue";

const BASE_URL = "https://www.speedrun.com/api/v1";
const SERIE = "souls";

async function $(path) {
  const resp = await fetch(`${BASE_URL}${path}`);
  const { data } = await resp.json();
  return data;
}

export async function fetchGames() {
  return $(`/series/${SERIE}/games?embed=categories,categories.game`);
}

export async function fetchGame(abbreviation) {
  const games = await fetchGames();
  const game = games.find((g) => g.abbreviation == abbreviation);

  if (game == undefined) throw "Game not found";
  return game;
}

export async function fetchLeaderboard(category) {
  return $(
    `/leaderboards/${category.game.data.id}/category/${category.id}?embed=players,variables,category`
  );
}

export function use(fetcher) {
  const state = reactive({
    isLoading: false,
    error: null,
    data: undefined,
  });

  async function update() {
    state.isLoading = true;

    try {
      state.data = await fetcher();
    } catch (error) {
      state.error = error;
    }
  }

  return {
    ...toRefs(state),
    update,
  };
}
