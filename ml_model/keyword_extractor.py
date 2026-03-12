import spacy

nlp = spacy.load("en_core_web_sm")

text = "Best AI tools for developers"

doc = nlp(text)

keywords = []

for token in doc:
    if token.pos_ in ["NOUN", "PROPN"]:
        keywords.append(token.text.lower())

print("Extracted keywords:", keywords)