const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();

const GITHUB_USERNAME = "AndersonVelozo";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const query = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

async function fetchContributions() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const total = json.data.user.contributionsCollection.contributionCalendar.totalContributions;

  fs.writeFileSync("src/data/contributions.json", JSON.stringify({ totalContributions: total }));
  console.log("✅ Contributions updated:", total);
}

fetchContributions().catch(console.error);
