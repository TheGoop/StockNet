class CommentEntry(object):
    def __init__(self, userName, time, message, upvoteCount=0):
        self.userName = userName
        self.time = time
        self.message = message
        self.upvoteCount = upvoteCount

    @staticmethod
    def from_dict(source):
        postEntry = CommentEntry(source['userName'], source['time'], source['message'])

        if 'upvoteCount' in source:
            postEntry.upvoteCount = source['upvoteCount']
        return postEntry

    def to_dict(self):
        dest = {
            'userName': self.userName,
            'time': self.time,
            'message': self.message
        }

        if self.upvoteCount:
            dest['upvoteCount'] = self.upvoteCount

        return dest

    def __repr__(self):
        return(
            f'CommentEntry(\
                userName={self.userName}, \
                time={self.time}, \
                message={self.message}, \
                upvoteCount={self.upvoteCount}\
            )'
        )

if __name__ == "__main__":
    from database.unitTesting.payloadClassesTests.commentEntryTesting import runTests
    runTests()