import pandas as pd
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# ------------------------------
# Load semantic AI model
# ------------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")

# ------------------------------
# Load dataset
# ------------------------------
df = pd.read_csv("dataset/youtube_creators.csv")

# Remove duplicate creators
df = df.drop_duplicates(subset=["channel_name"])

# ------------------------------
# TEXT CLEANING FUNCTION
# ------------------------------
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)  # remove links
    text = re.sub(r"[^a-zA-Z0-9 ]", "", text)  # remove special characters
    return text

# Clean title and description
df["title"] = df["title"].apply(clean_text)
df["description"] = df["description"].apply(clean_text)

# Combine title + description
df["content"] = df["title"] + " " + df["description"]

# ------------------------------
# BRAND INPUT
# ------------------------------
brand_description = input("Enter brand campaign description: ")
brand_description = clean_text(brand_description)

# ------------------------------
# CREATE EMBEDDINGS
# ------------------------------
texts = [brand_description] + df["content"].tolist()

embeddings = model.encode(texts)

brand_embedding = embeddings[0]
creator_embeddings = embeddings[1:]

similarity_scores = cosine_similarity(
    [brand_embedding], creator_embeddings
).flatten()

# Store similarity
df["content_similarity"] = similarity_scores

# ------------------------------
# FILTER WEAK MATCHES
# ------------------------------
df = df[df["content_similarity"] > 0.05]

# ------------------------------
# ENGAGEMENT CALCULATION
# ------------------------------
df["views"] = pd.to_numeric(df["views"], errors="coerce")
df["likes"] = pd.to_numeric(df["likes"], errors="coerce")
df["comments"] = pd.to_numeric(df["comments"], errors="coerce")

df["engagement_rate"] = (df["likes"] + df["comments"]) / df["views"]
df["engagement_rate"] = df["engagement_rate"].fillna(0)

# Normalize engagement
df["engagement_score"] = df["engagement_rate"] / df["engagement_rate"].max()

# ------------------------------
# FINAL RANKING SCORE
# ------------------------------
df["final_score"] = (
    0.7 * df["content_similarity"] +
    0.3 * df["engagement_score"]
)

# Sort creators
top_creators = df.sort_values(by="final_score", ascending=False)

# ------------------------------
# OUTPUT RESULTS
# ------------------------------
print("\nTop creators recommended for this brand campaign:\n")
print(top_creators[["channel_name", "title", "final_score"]].head(10))

# Save results
top_creators.head(10).to_csv(
    "models/recommended_creators.csv", index=False
)