class UserProfileEntry(object):
    def __init__(self, joinDate, favStocks=[],posts=[], upvotes=dict()):
        self.joinDate = joinDate
        self.favStocks = favStocks
        self.posts = posts
        self.upvotes = upvotes

    @staticmethod
    def from_dict(source):
        userEntry = UserProfileEntry(source['joinDate'])
        if 'favStocks' in source:
            userEntry.favStocks = source['favStocks']
        if 'posts' in source:
            userEntry.posts = source['posts']
        if 'upvotes' in source:
            userEntry.upvotes = source['upvotes']
        return userEntry

    def to_dict(self):
        dest = {
            'joinDate': self.joinDate,
        }

        if self.favStocks:
            dest['favStocks'] = self.favStocks
        if self.posts:
            dest['posts'] = self.posts
        if self.upvotes:
            dest['upvotes'] = self.upvotes

        return dest

    def __repr__(self):
        return(
            f'UserProfileEntry(\
                joinDate={self.joinDate}, \
                favStocks={self.favStocks}, \
                posts={self.posts}\
                upvotes={self.upvotes}\
            )'
        )

if __name__ == "__main__":
    from database.unitTesting.payloadClassesTests.userProfileEntryTesting import runTests
    runTests()