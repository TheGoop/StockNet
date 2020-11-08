class PostContentEntry(object):
    def __init__(self, userID, time, message, upvoteCount=0,comments=[]):
        self.userID = userID
        self.time = time
        self.message = message
        self.upvoteCount = upvoteCount
        self.comments = comments

    @staticmethod
    def from_dict(source):
        postEntry = PostContentEntry(source['userID'], source['time'], source['message'])

        if 'upvoteCount' in source:
            postEntry.upvoteCount = source['upvoteCount']
        if 'comments' in source:
            postEntry.comments = source['comments']
        return postEntry

    def to_dict(self):
        dest = {
            'userID': self.userID,
            'time': self.time,
            'message': self.message
        }

        if self.upvoteCount:
            dest['upvoteCount'] = self.upvoteCount
        if self.comments:
            dest['comments'] = self.comments

        return dest

    def __repr__(self):
        return(
            f'PostContentEntry(\
                userID={self.userID}, \
                time={self.time}, \
                message={self.message}, \
                upvoteCount={self.upvoteCount}, \
                comments={self.comments}\
            )'
        )

def runTests():
    entry1 = PostContentEntry("goop", "3AM","Monday is Wednesday",-4,["no", "u"])
    entry2 = PostContentEntry("blizzardgale", "5AM", "I lost because I dont have a chair, I can't sit down")
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

if __name__ == "__main__":
    runTests()