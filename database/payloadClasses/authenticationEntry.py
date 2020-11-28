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


if __name__ == "__main__":
    from database.unitTesting.payloadClassesTests.authenticationEntryTesting import runTests
    runTests()