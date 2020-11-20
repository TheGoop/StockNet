class AuthenticationEntry(object):
    def __init__(self, password):
        self.password = password

    @staticmethod
    def from_dict(source):
        authEntry = AuthenticationEntry(source['password'])
        return authEntry

    def to_dict(self):
        dest = {
            'password': self.password,
        }
        return dest

    def __repr__(self):
        return(
            f'AuthenticationEntry(\
                password={self.password}\
            )'
        )


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


if __name__ == "__main__":
    runTests()