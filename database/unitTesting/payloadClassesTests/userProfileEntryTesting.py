from database.payloadClasses.userprofileentry import UserProfileEntry


def runTests():
    entry1 = UserProfileEntry("01/23/2019",["Market","up","2","points"],["hello","there"])
    entry2 = UserProfileEntry("02/31/2020")
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = UserProfileEntry.from_dict(dict1)
    entry4 = UserProfileEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert (str(entry1) == str(entry3))
    assert (str(entry2) == str(entry4))