from database.payloadClasses.authenticationEntry import AuthenticationEntry


def runTests():
    entry1 = AuthenticationEntry("password")
    entry2 = AuthenticationEntry("hunter2")
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = AuthenticationEntry.from_dict(dict1)
    entry4 = AuthenticationEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert(str(entry1) == str(entry3))
    assert(str(entry2) == str(entry4))