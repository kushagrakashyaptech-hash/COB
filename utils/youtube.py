import re

def extract_channel_id(url):

    match = re.search(r"channel\/([a-zA-Z0-9_-]+)", url)

    if match:
        return match.group(1)

    return None