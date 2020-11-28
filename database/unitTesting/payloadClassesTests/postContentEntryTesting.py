from database.payloadClasses.postcontententry import PostContentEntry


def runTests():
    entry1 = PostContentEntry("goop", "jello dealer", "3AM","Monday is Wednesday", "fluff",-4,["no", "u"])
    entry2 = PostContentEntry("blizzardgale", "please, no johns","5AM", "I lost because I dont have a chair, I can't sit down", "salt")
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = PostContentEntry.from_dict(dict1)
    entry4 = PostContentEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert (str(entry1) == str(entry3))
    assert (str(entry2) == str(entry4))