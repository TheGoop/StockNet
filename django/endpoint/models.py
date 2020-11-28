from django.db import models

class Post(models.Model):
    username = models.CharField()
    postTitle = models.CharField()
    upvotes = models.IntField()
    comment = models.Comment()
    def __repr__(self):
	return self.postTitle
class Comment(models.Model):
    username = models.CharField()
    postTitle = models.CharField()
    text = models.CharField()

    def __repr__(self):
        return self.text
