let refresh_token =
  "AQCyOUirLEc9NW_JSR6eTNOtcgFnN_qZ5wlg9xucKvmqAT5oLNqOBtlsynrex2hQZg470yCMEqgbWDtn1xedeke5Dp4_pKT4fS3Fx9A_ff6gl18fA5zBcwjG7lkM0Zn2JQY";

const basic =
  "MGJkYzU0YjZjOWJhNDFhMmFjMzY0MTNhNGQ0MWU4ODM6MGExZWMzZWM2N2E2NGFjYjhjZjkwNTk3NTE0M2NiNWM=";
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  });

  return response.json();
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function getData() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return false; // not playing
  }
  return await response.json();
}
