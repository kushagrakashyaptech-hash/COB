def calculate_score(creator, campaign):
    niche_match = 1 if creator.niche.lower() == campaign.category.lower() else 0

    audience_match = 0
    if creator.audience_age and campaign.target_audience:
        if creator.audience_age.lower() == campaign.target_audience.lower():
            audience_match = 1

    follower_score = creator.followers / 100000

    score = (
        0.4 * creator.engagement_rate +
        0.3 * niche_match +
        0.2 * audience_match +
        0.1 * follower_score
    )

    return round(score, 4)