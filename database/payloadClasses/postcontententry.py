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

def runTests():
    entry1 = PostContentEntry("goop", "jello dealer", "3AM","Monday is Wednesday", "fluff",-4,["no", "u"])
    entry2 = PostContentEntry("blizzardgale", "please, no johns","5AM", "I lost because I dont have a chair, I can't sit down", "salt")
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