from googleapiclient.discovery import build
import pandas as pd

API_KEY = "AIzaSyCb-EoX1kjcGOu5wmRIaYFLViDVfGJjEJA"

youtube = build("youtube", "v3", developerKey=API_KEY)

videos = []
search_queries = [
    "technology gadgets",
    "fitness workout gym",
    "beauty skincare makeup",
    "gaming gameplay",
    "health tips medicine",
    "finance investing stock market",
    "food cooking recipes",
    "travel vlog"
]

videos = []

for query in search_queries:

    next_page_token = None

    for i in range(2):   # 2 pages = about 100 videos per niche

        request = youtube.search().list(
            q=query,
            part="snippet",
            type="video",
            maxResults=50,
            pageToken=next_page_token
        )

        response = request.execute()

        for item in response["items"]:

            video_id = item["id"]["videoId"]

            video_details = youtube.videos().list(
                part="statistics",
                id=video_id
            ).execute()

            stats = video_details["items"][0]["statistics"]

            videos.append({
                "channel_name": item["snippet"]["channelTitle"],
                "title": item["snippet"]["title"],
                "description": item["snippet"]["description"],
                "views": int(stats.get("viewCount", 0)),
                "likes": int(stats.get("likeCount", 0)),
                "comments": int(stats.get("commentCount", 0))
            })

        next_page_token = response.get("nextPageToken")
        
df = pd.DataFrame(videos)

df.to_csv("dataset/youtube_creators.csv", index=False, encoding="utf-8")

print("Collected", len(df), "videos with engagement data")
print("Dataset saved to dataset/youtube_creators.csv")