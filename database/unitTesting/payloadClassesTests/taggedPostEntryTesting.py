from database.payloadClasses.taggedpostentry import TaggedPostEntry


def runTests():
    __testIdentity()

def __testIdentity():
    entry1 = TaggedPostEntry(134957,"3AM")
    entry2 = TaggedPostEntry(1234521345,1645)
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = TaggedPostEntry.from_dict(dict1)
    entry4 = TaggedPostEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert (str(entry1) == str(entry3))
    assert (str(entry2) == str(entry4))