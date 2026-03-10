def classify_creator_tier(followers):

    if followers < 50000:
        return "micro"

    elif followers < 300000:
        return "mid"

    else:
        return "large"