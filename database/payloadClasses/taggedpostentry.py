class TaggedPostEntry(object):
    def __init__(self, postID, time):
        self.postID = postID
        self.time = time

    @staticmethod
    def from_dict(source):
        postEntry = TaggedPostEntry(source['postID'],source['time'])

        return postEntry

    def to_dict(self):
        dest = {
            'postID': self.postID,
            'time': self.time
        }

        return dest

    def __repr__(self):
        return(
            f'TaggedPostEntry(\
                postID={self.postID}, \
                time={self.time}\
            )'
        )

def runTests():
    entry1 = TaggedPostEntry(134957,"3AM")
    entry2 = TaggedPostEntry(1234521345,1645)
    print(entry1)
    print(entry2)
    dict1 = entry1.to_dict()
    dict2 = entry2.to_dict()
    print(dict1)
    print(dict2)
    entry3 = TaggedPostEntry.from_dict(dict1)
    entry4 = TaggedPostEntry.from_dict(dict2)
    print(entry3)
    print(entry4)

    assert (str(entry1) == str(entry3))
    assert (str(entry2) == str(entry4))

if __name__ == "__main__":
    runTests()