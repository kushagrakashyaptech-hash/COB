def calculate_engagement(likes, comments, views):
    if views == 0:
        return 0
    return (likes + comments) / views


def classify_creator_tier(followers):
    if followers < 50000:
        return "micro"
    elif followers < 300000:
        return "mid"
    else:
        return "large"