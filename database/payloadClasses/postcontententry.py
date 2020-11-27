class PostContentEntry(object):
    def __init__(self, userName, postTitle, time, message, flair, upvoteCount=0,comments=[]):
        self.userName = userName
        self.postTitle = postTitle
        self.time = time
        self.message = message
        self.flair = flair
        self.upvoteCount = upvoteCount
        self.comments = comments

    @staticmethod
    def from_dict(source):
        postEntry = PostContentEntry(source['userName'], source['postTitle'],source['time'], source['message'], source['flair'])

        if 'upvoteCount' in source:
            postEntry.upvoteCount = source['upvoteCount']
        if 'comments' in source:
            postEntry.comments = source['comments']
        return postEntry

    def to_dict(self):
        dest = {
            'userName': self.userName,
            'postTitle': self.postTitle,
            'time': self.time,
            'message': self.message,
            'flair': self.flair,
        }

        if self.upvoteCount:
            dest['upvoteCount'] = self.upvoteCount
        if self.comments:
            dest['comments'] = self.comments

        return dest

    def __repr__(self):
        return(
            f'PostContentEntry(\
                userName={self.userName}, \
                postTitle={self.postTitle}, \
                time={self.time}, \
                message={self.message}, \
                flair={self.flair}, \
                upvoteCount={self.upvoteCount}, \
                comments={self.comments}\
            )'
        )

if __name__ == "__main__":
    from database.unitTesting.payloadClassesTests.postContentEntryTesting import runTests
    runTests()