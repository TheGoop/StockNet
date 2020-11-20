class UserProfileEntry(object):
    def __init__(self, joinDate, favStocks=[],posts=[]):
        self.joinDate = joinDate
        self.favStocks = favStocks
        self.posts = posts

    @staticmethod
    def from_dict(source):
        userEntry = UserProfileEntry(source['joinDate'])
        if 'favStocks' in source:
            userEntry.favStocks = source['favStocks']
        if 'posts' in source:
            userEntry.posts = source['posts']
        return userEntry

    def to_dict(self):
        dest = {
            'joinDate': self.joinDate,
        }

        if self.favStocks:
            dest['favStocks'] = self.favStocks
        if self.posts:
            dest['posts'] = self.posts

        return dest

    def __repr__(self):
        return(
            f'UserProfileEntry(\
                joinDate={self.joinDate}, \
                favStocks={self.favStocks}, \
                posts={self.posts}\
            )'
        )

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

if __name__ == "__main__":
    runTests()