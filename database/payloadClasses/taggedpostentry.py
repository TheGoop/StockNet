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

##DEPRECATED##
# def __testMinHeap():
#     import datetime
#     from datetime import timezone
#     entry1 = TaggedPostEntry(1,datetime.datetime(2001,11,21,3,0,0,0,timezone.utc))
#     entry2 = TaggedPostEntry(2, datetime.datetime(1997, 1, 2, 3, 0, 0, 0, timezone.utc))
#     entry3 = TaggedPostEntry(3, datetime.datetime(2003, 11, 21, 3, 0, 0, 0, timezone.utc))
#     entry4 = TaggedPostEntry(4, datetime.datetime(2003, 10, 21, 3, 0, 0, 0, timezone.utc))
#     entry5 = TaggedPostEntry(5, datetime.datetime(2003, 11, 20, 3, 0, 0, 0, timezone.utc))


if __name__ == "__main__":
    from database.unitTesting.payloadClassesTests.taggedPostEntryTesting import runTests
    runTests()