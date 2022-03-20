const API_URL = 'http://localhost:8000';
const API_VERSION = 'v1';
// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/${API_VERSION}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/${API_VERSION}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a,b) => {
    return a.flightNumber - b.flightNumber
  });
}
  // Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
  return await fetch(`${API_URL}/${API_VERSION}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch),
    })
  } catch (err) {
    return {
      ok: false,
    }
  }
}
  // Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
  return await fetch(`${API_URL}/${API_VERSION}/launches/${id}`, {
    method: "delete",
    })
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};