from database.payloadClasses.commententry import CommentEntry


def runTests():
    entry1 = CommentEntry("goop", "3AM","Monday is Wednesday",-4)
    entry2 = CommentEntry("blizzardgale", "5AM", "I lost because I dont have a chair, I can't sit down")
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = CommentEntry.from_dict(dict1)
    entry4 = CommentEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert (str(entry1) == str(entry3))
    assert (str(entry2) == str(entry4))
