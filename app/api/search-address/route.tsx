import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");
  console.log("BASE_URL", BASE_URL);
  console.log("MAPBOX_ACCESS_TOKEN", process.env.MAPBOX_ACCESS_TOKEN);
  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "?language=en&limit=8&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=US" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await res.json();
  console.log("searchResult", searchResult);
  return NextResponse.json(searchResult);
}
