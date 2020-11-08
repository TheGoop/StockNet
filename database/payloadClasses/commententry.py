class CommentEntry(object):
    def __init__(self, userID, time, message, upvoteCount=0):
        self.userID = userID
        self.time = time
        self.message = message
        self.upvoteCount = upvoteCount

    @staticmethod
    def from_dict(source):
        postEntry = CommentEntry(source['userID'], source['time'], source['message'])

        if 'upvoteCount' in source:
            postEntry.upvoteCount = source['upvoteCount']
        return postEntry

    def to_dict(self):
        dest = {
            'userID': self.userID,
            'time': self.time,
            'message': self.message
        }

        if self.upvoteCount:
            dest['upvoteCount'] = self.upvoteCount

        return dest

    def __repr__(self):
        return(
            f'CommentEntry(\
                userID={self.userID}, \
                time={self.time}, \
                message={self.message}, \
                upvoteCount={self.upvoteCount}\
            )'
        )

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

if __name__ == "__main__":
    runTests()